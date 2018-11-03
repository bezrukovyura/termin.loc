namespace Termin.Components {

  class FormInputController implements ng.IController {

    static $inject: string[] = [
      "$scope",
    ];

    constructor(public $scope) { }

    $onInit?(): void {

    }

    public data: string = "1234";
    public lastName: string = "Пупкин";
  }

  export const FormInputComponent: angular.IComponentOptions = {
    bindings: {
      guid: "@"
    },
    controller: FormInputController,
    controllerAs: "ctrl",
    //template: "{{ctrl.data}}",
    templateUrl: "./Scripts/Components/FormInput/FormInput.html",
  };


}
