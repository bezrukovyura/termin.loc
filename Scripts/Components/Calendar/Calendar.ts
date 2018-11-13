namespace Termin.Components {

  class AllStrings {
    first: Unit[];
    second: Unit[];
    date?: string;
  }

  class CalendarController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService", "ConverterService", "TabService"];

    constructor(
      public $scope: ng.IScope, 
      private storageService: Services.StorageService, 
      private converter: Services.ConverterService,
      private tabs: Services.TabService
      ) { }
    

    $onInit?(): void {

      this.$scope.$watch("ctrl.tabs.active", (x: number) => {

        if (x == 0)
          this.update();
      });

    }

    public dateEdit: string = this.converter.date(new Date());

    private update = () => {
      debugger
      this.init(this.converter.date(<any>this.dateEdit));
    }


   /** все термины за день, разделенные на первую и вторую половину */
     private allStrings: AllStrings = { first: [], second: [] };

    private showProgressBar: boolean;

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

    /** Отрисовка */
    private init(date: string, count: number = 1) {
      this.showProgressBar = true;
      this.allStrings = {
        first: [],
        second: [],
        date: ""
      };

      this.storageService.get(date).then(x => {
        this.render(date, x);
        this.showProgressBar = false;
      });

      this.render(date);
    }

    private render(date: string, exist?: Unit[]) {

      let units = this.createAllEmptyString(date);
      let prepareUnits: Unit[] = [];
      if (exist)
        units.forEach(x => {
          let find = exist.filter(y => y.date == x.date && y.hour == x.hour && y.minute == x.minute);
          prepareUnits.push(find && find.length && find.length > 0 ? find[0] : x);
        });
      else
        prepareUnits = units;


      this.allStrings = {
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


  }

  export const CalendarComponent: angular.IComponentOptions = {
    bindings: {
      tab: "=",
      showProgressBar: "="
    },
    controller: CalendarController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/Calendar/Calendar.html",
  };


}
