namespace Termin.Components {

  declare var md5: (s: string) => string;

  class UsersEditorController implements ng.IController {

    static $inject: string[] = [
      "$scope",
      "AccountService",
      "$mdToast"
    ];

    public allUsers: User[];

    constructor(
      public $scope: ng.IScope,
      private accounts: Services.AccountService,
      private $mdToast: any,
    ) {

      this.update();

    }

    save() {
      // this.accounts.saveAllUser( this.allUsers).then(x => {
      //   if(x == "ok")
      //     this.toast("Сохранено", "");
      //   else
      //     alert("Ошибка сохранения");

      // });
    }

    add() {
      this.allUsers.push({ name: "", email: "" });
    }

    remove(user: User) {

      if(!user.id) {
        let newAllUsers: User[] = [];
        
        this.allUsers.forEach(x => {
          if(x.name != user.name && x.email != user.email)
            newAllUsers.push(x);
        });
        this.allUsers = newAllUsers;
      }
      else{
        this.accounts.remove(user).then(x => {
          this.update();
        });
      }

    }

    update = () => {
      this.accounts.getAllUser().then(x => {
        this.allUsers = x;
      });
    }


    $onInit?(): void {


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

  export const UsersEditorComponent: angular.IComponentOptions = {
    bindings: {
      showProgressBar: "=",
    },
    controller: UsersEditorController,
    controllerAs: "ctrl",
    templateUrl: "Scripts/Components/UsersEditor/UsersEditor.html",
  };


}
