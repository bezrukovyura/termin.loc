namespace Termin.Components {

  class CalendarController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService"];

    constructor(public $scope: any, private storageService: Services.StorageService) { }

    $onInit?(): void {
      this.day();
    }

    private pullUnits: Unit[] = [];
    private toEdit: Unit;


    private addEmpty(units: Unit[], i: number): Unit[] {

      units = _.sortBy(units, ['date', 'hour', 'minute']);

      if (i > units.length)
        return units;

      if (+units[i].minute == 0 && !(+units[i + 1].minute == 30 && +units[i].hour == +units[i].hour)){
        units.push({hour: units[i].hour, minute: "30"});
        this.addEmpty(units, ++i)
      }
      else if (+units[i].minute == 30 && !(+units[i + 1].minute == 0 && +units[i + 1].hour == +units[i].hour + 1)){
        units.push({hour: (+units[i].hour + 1) > 9 ? (+units[i].hour + 1) + "" : "0" + (+units[i].hour + 1), minute: "00"});
        this.addEmpty(units, ++i)
      }
    }

    private day(count: number = 1) {
      let units= this.storageService.unitGetAll();
      debugger
      let x = this.addEmpty(units, 0);
      this.pullUnits = units;

    }

    public onEdit(unit: Unit) {
      this.toEdit = unit;
    }

  }

  export const CalendarComponent: angular.IComponentOptions = {
    bindings: {
      toEdit: "="
    },
    controller: CalendarController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/Calendar/Calendar.html",
  };


}
