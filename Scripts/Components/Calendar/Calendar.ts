declare var pdfMake: any;
declare var html2canvas: any;

namespace Termin.Components {

  class AllStrings {
    first: Unit[];
    second: Unit[];
    date?: string;
  }

  class CalendarController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService", "ConverterService", "TabService", "$mdDialog"];

    constructor(
      public $scope: ng.IScope,
      private storageService: Services.StorageService,
      private converter: Services.ConverterService,
      private tabs: Services.TabService,
      private $mdDialog: any
    ) { }


    $onInit?(): void {

      this.roleAdmin = this.role == 1 ? true : false;

      this.$scope.$watch("ctrl.tabs.active", (x: number) => {
        if (x == 0)
          this.update();
      });

    }

    public role: number;
    public roleAdmin: boolean = false;

    public dateEdit: string = this.converter.date(new Date());

    private update = () => {
      this.init(this.converter.date(<any>this.dateEdit));
    }


    /** все термины за день, разделенные на первую и вторую половину */
    private allStrings: AllStrings = { first: [], second: [] };

    /** Все дни для отображения */
    private allDays: AllStrings[] = [];



    /** Создание пустых терминов на весь день */
    private createAllEmptyString(date: string, fromHour: number = 6, toHour: number = 20, interval: number = 30): Unit[] {
      let strings: Unit[] = [];
      for (let i = fromHour; i < toHour; i++) {
        for (let j = 0; j < 60; j += interval) {
          strings.push({ date: date, hour: this.converter.time(i), minute: this.converter.time(j) });
        }
      }
      return strings;
    }

    public changeTermins() {
      if (!this.toChangeClass) {
        this.toChangeClass = true;
      }
      else {
        if (this.toChange.length == 2) {
          let tmp0: Unit = _.cloneDeep(this.toChange[0]);
          tmp0.date = this.toChange[1].date;
          tmp0.hour = this.toChange[1].hour;
          tmp0.minute = this.toChange[1].minute;
          let tmp1: Unit = _.cloneDeep(this.toChange[1]);
          tmp1.date = this.toChange[0].date;
          tmp1.hour = this.toChange[0].hour;
          tmp1.minute = this.toChange[0].minute;

          this.storageService.update(tmp0).then(x => {
            if (x)
              this.storageService.update(tmp1).then(y => {
                if (y) {
                  this.update();
                  this.toChangeOk = false;
                }
                else
                  alert("Не удалось поменять местами")
              });
            else
              alert("Не удалось поменять местами")
          });
        }
        this.toChangeClass = false;
        this.toChange = [];
      }
    }

    public addToChange(unit: Unit) {
      if (!unit.id)
        return;

      if (this.toChange.length < 3)
        this.toChange.push(unit);
      else {
        this.toChange = [];
        this.toChange.push(unit);
      }

      this.toChangeOk = this.toChange.length == 2;
    }

    /** для отображения плюсов возле надписей */
    public toChangeClass: boolean = false;
    /** для отображения плюсов возле надписей */
    public toChangeOk: boolean = false;
    /** массив из двух записей, чтобы поменять время приема */
    public toChange: Unit[] = [];


    public isFinalCommit: boolean = false;

    public finalCommit() {
      this.isFinalCommit = !this.isFinalCommit;
    }

    public finalCommitDialog(unit: Unit) {
      if (!unit.id)
        return;
      this.terminReceptionObject = unit;
      this.$mdDialog.show({
        contentElement: '#mdStaticDialog',
        parent: angular.element(document.body)
      });
    }

    public finalCommitDialogClose() {
      this.$mdDialog.hide(alert, "finished");
      this.terminReception = undefined;
    }

    public terminReception: string;
    public terminReceptionObject: Unit;

    public terminReceptionApply() {
      this.terminReceptionObject.visitDateNumber = this.terminReception;
      this.storageService.update(this.terminReceptionObject).then(x => {
        if (x) {
          this.update();
          this.finalCommitDialogClose();
        }
        else
          alert("Не удалось сохранить");
      });
    }

    /** Отрисовка */
    private init(date: string) {
      debugger


      this.allDays = new Array(this.selectCountDays);

      for (let i = 0; i < this.allDays.length; i++) {
        let datepoint = new Date(new Date(date).getTime() + 86400000 * i);
        let stringDate = this.converter.date(datepoint);
        this.storageService.get(stringDate).then(x => {
          debugger
          this.allDays[i] = this.render(stringDate, x);
        });
      }


      //this.render(date);


    }

    private render(date: string, exist?: Unit[]): AllStrings {

      let units = this.createAllEmptyString(date);
      let prepareUnits: Unit[] = [];
      if (exist)
        units.forEach(x => {
          let find = exist.filter(y => y.date == x.date && y.hour == x.hour && y.minute == x.minute);
          prepareUnits.push(find && find.length && find.length > 0 ? find[0] : x);
        });
      else
        prepareUnits = units;


      return {
        first: prepareUnits.slice(0, prepareUnits.length / 2),
        second: prepareUnits.slice(prepareUnits.length / 2, prepareUnits.length),
        date: date
      }

    }

    /** Термин, который будем редактировать */
    public onEdit(unit: Unit) {
      this.storageService.UnitToEdit = unit;
      this.tabs.setActive(1);
    }

    /** Варианты количества дней для отображения */
    countsDay: number[] = [
      1, 2, 5, 7, 30
    ];

    /** По умолчанию показываем один день */
    selectCountDays: number = 1;

    openPdf() {

      let viewport = document.querySelector("meta[name=viewport]");
      if(this.selectCountDays == 30)
        viewport.setAttribute('content', 'width=2023, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
      else
        viewport.setAttribute('content', 'width=1300, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');


      html2canvas(document.getElementById('toPrint')).then((canvas: any) => {
        debugger
        var data = canvas.toDataURL();
        var docDefinition = {
          content: [{
            image: data,
            width: 500
          }]
        };
        pdfMake.createPdf(docDefinition).open();

        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
      });

    }

  }

  export const CalendarComponent: angular.IComponentOptions = {
    bindings: {
      tab: "=",
      role: "="
    },
    controller: CalendarController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/Calendar/Calendar.html",
  };


}
