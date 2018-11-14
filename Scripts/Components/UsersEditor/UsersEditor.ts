namespace Termin.Components {

  declare var md5: (s: string) => string;

  class UsersEditorController implements ng.IController {

    static $inject: string[] = [
      "$scope",
      "AccountService",
      "$mdToast"
    ];

    public allUsers: User[];
    public oldAllUsers: User[];

    constructor(
      public $scope: ng.IScope,
      private accounts: Services.AccountService,
      private $mdToast: any,
    ) {

      this.update();

    }

    save(user: User) {



      if(user.id) {
        
        this.oldAllUsers.forEach(x=> {
          if(x.id === user.id && x.password !== user.password)
              user.password = md5(user.password);
        });

        this.accounts.update(user).then(x => {
          if(x == "ok"){
            this.toast("Сохранено", "");
            this.update();
          }
          else
            alert("Ошибка сохранения");
        });
      } 
      else {
        user.password = md5(user.password);
        this.accounts.create(user).then(x => {
          if(x){
            this.toast("Создано", "");
            this.update();
          }
          else
            alert("Ошибка сохранения");
        });
      }

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
        this.oldAllUsers = _.cloneDeep(x);
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
