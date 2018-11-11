namespace Termin.Components {

  class AllStrings {
    first: Unit[];
    second: Unit[];
    date?: string;
  }

  class CalendarController implements ng.IController {

    static $inject: string[] = ["$scope", "$timeout", "StorageService"];

    constructor(public $scope: ng.IScope, private $timeout: ng.ITimeoutService, private storageService: Services.StorageService) { }

    $onInit?(): void {

      this.$scope.$watch("ctrl.indexTab", (valNew: Unit) => {
        if (valNew === 1)
          this.update();
      });

    }

    private apply(fn: () => void) {
      this.$scope.safeApply = (fn: () => void) => {
        let phase = this.$scope.$root.$$phase;
        if (phase == "$apply" || phase == "$digest")
          fn && (typeof (fn) === "function") && fn();
        else
          this.$scope.$apply(fn);
      };
    }

    private update = () => {
      this.init("2018-11-11");
    }

    public indexTab: number;

   /** все термины за день, разделенные на первую и вторую половину */
     private allStrings: AllStrings = { first: [], second: [] };

    /** Терин для передачи во внешний scope */
    private toEdit: Unit;

    private showProgressBar: boolean;

    /** Создание пустых терминов на весь день */
    private createAllEmptyString(date: string, fromHour: number = 6, toHour: number = 20, interval: number = 30): Unit[] {
      let strings: Unit[] = [];
      for (let i = fromHour; i < toHour; i++) {
        for (let j = 0; j < 60; j += interval) {
          strings.push({ date: date, hour: this.convertTime(i), minute: this.convertTime(j) });
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
      this.toEdit = unit;
    }

    /** Сегодняшняя дата в формате гггг-мм-дд  */
    private getDateNow() {
      let d = new Date();
      return (new Date()).getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getUTCDate() + 1);
    }

    /** перевод числового времени в строковый */
    private convertTime(x: number): string {
      if (x === 0)
        return "00";
      if (x < 10)
        return "0" + x;
      else
        return x + "";
    }


  }

  export const CalendarComponent: angular.IComponentOptions = {
    bindings: {
      toEdit: "=",
      indexTab: "=",
      showProgressBar: "="
    },
    controller: CalendarController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/Calendar/Calendar.html",
  };


}
