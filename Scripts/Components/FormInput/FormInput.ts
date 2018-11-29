namespace Termin.Components {

  class FormInputController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService", "ConverterService", "$mdToast", "TranslateService"];

    constructor(
      private $scope: any, 
      private storageService: Services.StorageService, 
      private ConverterService:  Services.ConverterService, 
      private $mdToast: any,
      public translateService :Termin.Services.TranslateService
      ) { }

    $onInit?(): void {

      this.$scope.l = this.translateService;

      debugger

      this.roleAdmin = this.role == 1 ? true : false;

      this.$scope.$watch("ctrl.storageService.UnitToEdit", (valNew: Unit) => {

        if (valNew) {
          this.unit = this.storageService.UnitToEdit;
        }
      });

    }

    public role: number;
    public roleAdmin: boolean = false;
    public unit: Unit;
    private showProgressBar: boolean;
    private tab: {i: number};

    private backCalendar(){
      this.tab.i = 1;
    }

    public clear() {
      this.unit = {};
      this.storageService.UnitToEdit = null;
    }


    public editSave() {
      this.unit.date = this.ConverterService.date(<any>this.unit.date);
      this.storageService.update(this.unit).then(x => {
        if (x) {
          this.toast('Запись "' + this.unit.fam + '" обновлена!', "toastOk");
          this.clear();
          this.backCalendar();
        }
        else {
          this.toast('Запись НЕ сохранена! Попробуйте снова.', "toastBad");
        };
      });
    }

    public save() {
      this.showProgressBar = true;
      this.unit.date = this.ConverterService.date(<any>this.unit.date ? <any>this.unit.date : new Date());
      this.storageService.save(this.unit).then(x => {
        if (x) {
          this.toast('Запись "' + this.unit.fam + '" сохранена!', "toastOk");
          this.clear();
          this.showProgressBar = false;
        }
        else {
          this.toast('Запись НЕ сохранена! Попробуйте снова.', "toastBad");
          this.showProgressBar = false;
        }

      });
    }

    public delete() {
      this.showProgressBar = true;
      this.storageService.delete(this.unit).then(x => {
        if (x) {
          this.toast('Запись "' + this.unit.fam + '" удалена!', "toastOk");
          this.clear();
          this.showProgressBar = false;
          this.backCalendar();
        }
        else {
          this.toast('Запись НЕ удалена! Попробуйте снова.', "toastBad");
          this.showProgressBar = false;
        }

      });
    }

    private toast(text: string, cssClass: string) {

      var pinTo = "bottom left";

      this.$mdToast.show(
        this.$mdToast.simple()
          .toastClass(cssClass)
          .textContent(text)
          .position(pinTo)
          .hideDelay(5000)
          .highlightAction(true)
      );

    }
  }

  export const FormInputComponent: angular.IComponentOptions = {
    bindings: {
      showProgressBar: "=",
      tab: "=",
      role: "="
    },
    controller: FormInputController,
    controllerAs: "ctrl",
    templateUrl: "./Scripts/Components/FormInput/FormInput.html",
  };


}
