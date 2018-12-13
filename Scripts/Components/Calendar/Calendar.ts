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

      this.setVisitDateNumber().then(x => this.terminReception = x);

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
      //проверка
      this.isUniqVisitDateNumber().then(z => {
        if (!z) {
          alert("error save. not uniq or not correct");
          this.setVisitDateNumber().then(x => this.terminReception = x);
          return
        }
        this.terminReceptionObject.visitDateNumber = this.terminReception;
        this.storageService.update(this.terminReceptionObject).then(x => {
          if (x) {
            this.update();
            this.finalCommitDialogClose();
          }
          else
            alert("Не удалось сохранить");
        });
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


    private offsetHeightThreeWeek(): number {
      if (!this.is30Days())
        return undefined;
      return (<any>document.querySelector('.oneDay.day0')).offsetHeight + (<any>document.querySelector('.oneDay.day7')).offsetHeight + (<any>document.querySelector('.oneDay.day14')).offsetHeight;
    }

    private is30Days(): boolean {
      return this.selectCountDays == 30;
    }

    private setPrintStyle(isPrint: boolean) {
      if (isPrint) {

        let temp = document.createElement('div');
        temp.id = "printStyle"
        temp.innerHTML = '<style id="printStyle">md-toolbar._md,md-tabs-wrapper,.nowDate {display: none}</style>';
        document.getElementById('toPrint').appendChild(temp.firstChild);

        document.getElementById('toPrint').style.width = this.is30Days ? "1500px" : "1200px";
      }
      else {
        document.getElementById('printStyle').outerHTML = "<font></font>";
        document.getElementById('toPrint').style.width = "";
      }
    }

    openPdf() {
      debugger
      this.setPrintStyle(true);

      html2canvas(document.getElementById('toPrint'), { height: this.offsetHeightThreeWeek() })
        .then((canvas: any) => {
          debugger
          var page1 = canvas.toDataURL();
          html2canvas(document.getElementById('toPrint'), { y: 30 + this.offsetHeightThreeWeek() })
            .then((canvas: any) => {
              debugger
              var page2 = canvas.toDataURL();
              var docDefinition;
              if (this.is30Days())
                docDefinition = {
                  info: {
                    title: 'Termin calendar',
                  },
                  content: [{
                    image: page1,
                    width: 500,
                    pages: 2,
                    startPosition: {
                      pageNumber: 1
                    }
                  },
                  {
                    image: page2,
                    width: 500,
                    startPosition: {
                      pageNumber: 2
                    }
                  }]
                };
              else
                docDefinition = {
                  info: {
                    title: 'Termin calendar',
                  },
                  content: [{
                    image: page1,
                    width: 500,
                    pages: 2,
                    startPosition: {
                      pageNumber: 1
                    }
                  }]
                };

              pdfMake.createPdf(docDefinition).download();
              this.setPrintStyle(false);
            });

        });




    }

    setVisitDateNumber(): ng.IPromise<string> {
      return this.storageService.getTermsLastChecked().then(x => {
        let arr = x.visitDateNumber.split("/");
        let currentId = +arr[0];
        let year = "" + new Date().getFullYear();
        let currentYear = year[2] + year[3];
        return (currentId + 1) + "/" + currentYear;
      });
    }

    isUniqVisitDateNumber(): ng.IPromise<boolean> {
      return this.setVisitDateNumber().then(x => {
        let arr = x.split("/");
        let currentId = +arr[0];
        let year = "" + new Date().getFullYear();
        let currentYear = year[2] + year[3];

        let arr1 = this.terminReception.split("/");
        let currentIdWritten = +arr1[0];
        let currentYearWritten = arr1[1];
        return currentIdWritten > currentId && currentYearWritten == currentYear;
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
