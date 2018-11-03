namespace Termin.Services {

  interface IAccountData {
    login: string;
    password: string;
  }

  export class AccountService {

    static $inject: string[] = ["$http", "$q"];

    private static baseUrl = "/Account/";
    private static storagePath = "login";

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }


    public HasAccess(): ng.IPromise<any> {
      return this.login("Иван", "123").then(
        response => {
          if (response)
            console.log("logIn ok");
          else
            console.log("logIn bad");
        },
        r => {
          return this.$q.reject(r.data);
        });
    }

    private login(login: string, password: string): ng.IPromise<boolean> {
      let accountData: IAccountData = { login: login, password: password};
      return this.$http.post<boolean>(AccountService.baseUrl + "userPermissions", accountData)
        .then((response) => {
          return response.data;
        },
        (r) => {
          return this.$q.reject(r.data); });
    };

    private savePass(accountData: IAccountData) {
      localStorage.setItem(AccountService.storagePath, JSON.stringify({ login: accountData.login, password: accountData.password }))
    };

    private loginOut() {
      localStorage.setItem(AccountService.storagePath, "");
    };

    private getAccess() {
      try {
        let json: IAccountData = JSON.parse(localStorage.getItem(AccountService.storagePath))
        if (json.login.length > 0 && json.password.length > 0) {
          this.login(json.login, json.password).then(x => {
            debugger
          }).catch(x => {
            debugger
          });
        }
      }
      catch{

      }
    }

  }
}