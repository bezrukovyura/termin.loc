namespace Termin.Components {

  class FormInputController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService"];

    constructor(private $scope: any, private storageService: Services.StorageService) { }

    $onInit?(): void {

      this.$scope.$watch("ctrl.storageService.UnitToEdit", (valNew: Unit) => {
        if (valNew) {
          this.unit = this.storageService.UnitToEdit;
          this.isEdit = true;
        }
      });

    }

    public unit: Unit;
    public toEdit: Unit;
    private isEdit: boolean;


    public clear() {
      this.unit = {};
      this.storageService.UnitToEdit = null;
      this.isEdit = false;
    }

    public save() {
      this.storageService.unitSave(this.unit);
    }
  }

  export const FormInputComponent: angular.IComponentOptions = {
    bindings: {
      toEdit: "="
    },
    controller: FormInputController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/FormInput/FormInput.html",
  };


}
