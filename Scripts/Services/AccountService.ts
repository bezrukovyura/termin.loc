namespace Termin.Services {

  declare var md5: (s: string) => string;

  export class AccountService {

    /**  0 - user, 1 - admin, -1 - error === user.role */

    private static baseUrl = "/php/users.php";

    static $inject: string[] = ["$http", "$q"];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }

    public user: User;

    

    logout(): ng.IPromise<boolean> {
      return this.$http.post<any>(AccountService.baseUrl, { method: "logout" })
        .then((response) => {
            return true;
        },
          (r) => {
            return this.$q.reject(false);
          }
        );
    };

    getUser(user: User): ng.IPromise<User> {
      return this.$http.post<User[]>(AccountService.baseUrl, { method: "getRole", user: user })
        .then((response) => {

          if (response.data.length !== 1)
            return undefined;

          if (response.data[0].role == 1 || response.data[0].role == 0) {
            this.setKeyStorage(user);
            this.user = response.data[0];
            this.user.role = +this.user.role;
            return this.user;
          }
          return undefined;
        },
          (r) => {
            return this.$q.reject(undefined);
          }
        );
    };


    restoreSession(): ng.IPromise<User> {
      let user = this.getKeyStorage();
      if(user.email && user.email && user.email.length > 1 && user.email.length > 1)
      return this.getUser({email: user.email, password: user.password});
    }

    exit() {
      this.logout().then(()=>{});
      this.removeKeyStorage();
    }

    setKeyStorage(user: User) {
      localStorage.setItem("password", user.password)
      localStorage.setItem("email", user.email)
    }

    getKeyStorage(): { email: string, password: string } {
      return {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      }
    }

    removeKeyStorage() {
      localStorage.setItem("password", "")
      localStorage.setItem("email", "")
    }

  }
}