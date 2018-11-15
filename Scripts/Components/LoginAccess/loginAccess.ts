namespace Termin.Components {

  declare var md5: (s: string) => string;
  
  class LoginAccessController implements ng.IController {

    static $inject: string[] = [
      "$scope",
      "AccountService",
      "$mdToast",
      "TabService"
    ];

    constructor(
      public $scope: ng.IScope, 
      private AccountService: Services.AccountService, 
      private $mdToast: any,
      private tabs: Services.TabService
      ) { }

    private showProgressBar: boolean;
    
    public userRole: {level: number, name: string};

    private email: string;
    private password: string;

    $onInit?(): void {

      this.AccountService.restoreSession().then(
        x=>{
          if (x && x.role !== undefined && x.role > -1) {
            this.toast(x.name + ", рады Вас видеть!", "");
            this.tabs.setActive(1);
            this.userRole.name = x.name ;
            this.role();
            this.showProgressBar = false;
          }
        }
      );
    }

    enter() {
      this.showProgressBar = true;
      this.AccountService.getUser({ email: this.email, password: md5(this.password) }).then(x => {

        if (x && x.role !== undefined && x.role > -1) {
          this.toast(x.name + ", рады Вас видеть!", "");
          this.tabs.setActive(1);
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
      userRole: "="
    },
    controller: LoginAccessController,
    controllerAs: "ctrl",
    templateUrl: "Scripts/Components/LoginAccess/LoginAccess.html",
  };


}
