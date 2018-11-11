namespace Termin.Components {

  class LoginAccessController implements ng.IController {

    static $inject: string[] = [
      "$scope",
      "AccountService",
      "$mdToast"
    ];

    constructor(public $scope: ng.IScope, private AccountService: Termin.Services.AccountService, private $mdToast: any) { }

    private showProgressBar: boolean;
    private indexTab: number;
    
    public userRole: {level: number, name: string};

    private email: string;
    private password: string;

    $onInit?(): void {

    }

    enter() {
      this.showProgressBar = true;
      this.AccountService.getUser({ email: this.email, password: this.password }).then(x => {
        debugger
        if (x && x.role && x.role > -1) {
          this.toast(x.name + ", рады Вас видеть!", "");
          this.indexTab = 1;
          this.userRole.name = x.name ;
        }
        else {
          this.toast("Попробуйте снова...", "");
        }
        this.role();
        this.showProgressBar = false;
      })
    }

    role() {
      this.userRole.level = this.AccountService && this.AccountService.user && this.AccountService.user.role > -1 ? this.AccountService.user.role : -1;
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

  export const LoginAccessComponent: angular.IComponentOptions = {
    bindings: {
      showProgressBar: "=",
      indexTab: "=",
      userRole: "="
    },
    controller: LoginAccessController,
    controllerAs: "ctrl",
    templateUrl: "Scripts/Components/LoginAccess/LoginAccess.html",
  };


}
