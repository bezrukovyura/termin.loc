namespace Termin.Services {

  declare var md5: (s: string) => string;

  export class AccountService {

    private static baseUrl = "/php/users.php";

    static $inject: string[] = ["$http", "$q"];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }

    public user: User;

    /** 0 - user, 1 - admin, -1 - error */
    getUser(user: User): ng.IPromise<User> {
      return this.$http.post<User[]>(AccountService.baseUrl, { method: "getRole", user: user })
        .then((response) => {
          debugger

          if(response.data.length !== 1)
            return undefined;

          if (response.data[0].role == 1 || response.data[0].role == 0) {
            this.user = response.data[0];
            this.user.role = +this.user.role;
            return this.user;
          }
          return undefined;
        },
          (r) => {
            debugger
            return this.$q.reject(undefined);
          }
        );
    };

    exit(){
      this.removeKeyStorage();
    }
    setKeyStorage(user: User) {
      debugger
      localStorage.setItem("secureKey", md5(user.password))
    }

    getKeyStorage(user: User) {
      debugger
      localStorage.getItem("secureKey")
    }

    removeKeyStorage() {
      localStorage.setItem("secureKey", "")
    }

  }
}