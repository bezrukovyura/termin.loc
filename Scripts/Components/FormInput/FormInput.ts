namespace Termin.Components {

  class FormInputController implements ng.IController {

    static $inject: string[] = ["$scope", "StorageService", "ConverterService", "$mdToast", "TranslateService"];

    constructor(
      private $scope: any,
      private storageService: Services.StorageService,
      private ConverterService: Services.ConverterService,
      private $mdToast: any,
      public translateService: Termin.Services.TranslateService
    ) {
      this.unit = this.unit ? this.unit : <any>{};
      this.unit.birthday = this.unit.birthday ? this.unit.birthday : <any>{};

    }

    $onInit?(): void {

      this.unit = this.unit ? this.unit : <any>{};
      this.unit.birthday = this.unit.birthday ? this.unit.birthday : <any>{};

      this.$scope.l = this.translateService;
      this.roleAdmin = this.role == 1 ? true : false;

      this.$scope.$watch("ctrl.storageService.UnitToEdit", (valNew: Unit) => {
        if (valNew) {
          this.unit = this.storageService.UnitToEdit;
        }
      });

    }

    onBirthdayChangeError(): boolean {

      this.unit = this.unit ? this.unit : <any>{};
      this.unit.birthday = this.unit.birthday ? this.unit.birthday : <any>{};

      let result = this.unit.birthday.year > 1910 && this.unit.birthday.year < new Date().getFullYear() && this.unit.birthday.mounth > 0 && this.unit.birthday.mounth < 13 && this.unit.birthday.day > 0 && this.unit.birthday.day < 32
      let result2 = !this.unit.birthday.day && !this.unit.birthday.year && !this.unit.birthday.mounth
      return !result && !result2;
    }

    public role: number;
    public roleAdmin: boolean = false;
    public unit: Unit;
    private showProgressBar: boolean;
    private tab: { i: number };

    private backCalendar() {
      this.tab.i = 1;
    }

    public clear() {
      this.unit = <any>{};
      this.storageService.UnitToEdit = null;
    }

    private isReserviert() {
      this.storageService.isReserviert(this.unit)
    }

    public editSave() {
      this.unit.date = this.ConverterService.date(<any>this.unit.date);
      this.storageService.isReserviert(this.unit).then(noUniq => {

        if (noUniq) {
          this.toast('Данное время занято!', "toastBad");
          return;
        }

        this.storageService.update(this.unit).then(x => {
          if (x) {
            this.toast('Запись "' + this.unit.fam + '" обновлена!', "toastOk");
            this.clear();
            this.backCalendar();
          }
          else
            this.toast('Запись НЕ сохранена! Попробуйте снова.', "toastBad");
        });

      })



    }



    public save() {
      this.unit.date = this.ConverterService.date(<any>this.unit.date ? <any>this.unit.date : new Date());
      this.unit.fam = !this.unit.name && !this.unit.fam ? this.translateService.get().reserviert : this.unit.name;

      this.storageService.isReserviert(this.unit).then(noUniq => {

        if (noUniq) {
          this.toast('Данное время занято!', "toastBad");
          return;
        }

        this.storageService.save(this.unit).then(x => {
          if (x) {
            this.toast('Запись "' + this.unit.fam + '" сохранена!', "toastOk");
            this.clear();
          }
          else 
            this.toast('Запись НЕ сохранена! Попробуйте снова.', "toastBad");
        });

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
