namespace Termin.Components {

  class LoginAccessController implements ng.IController {

    static $inject: string[] = [
      "$scope",
      "$injector",
      "AccountService"
    ];

    constructor(public $scope, private account: Termin.Services.AccountService) { }

    $onInit?(): void {

    }

    public data: string = "qwer";
  }

  export const LoginAccessComponent: angular.IComponentOptions = {
    bindings: {
      guid: "@"
    },
    controller: LoginAccessController,
    controllerAs: "ctrl",
    template: "{{ctrl.data}}",
    //templateUrl: "Scripts/LoginAccess/LoginAccess.html",
  };


}
