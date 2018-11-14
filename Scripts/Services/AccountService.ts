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

    getAllUser(): ng.IPromise<User[]> {
      return this.$http.post<User[]>(AccountService.baseUrl, { method: "allUsers"})
        .then((response) => {

          if (response.data.length < 1){
            alert("Не удалось запросить список пользователей");
            return undefined;
          }

          return response.data;
        },
          (r) => {
            return this.$q.reject(undefined);
          }
        );
    };

    update(user: User){
      return this.$http.post<string>(AccountService.baseUrl, { method: "updateUser", user: user})
      .then((response) => {
        if (response.data != "ok"){
          alert("Не удалось обновить пользователя");
          return undefined;
        }

        return response.data;
      },
        (r) => {
          return this.$q.reject(undefined);
        }
      );
    }

    create(user: User): ng.IPromise<boolean>{
      return this.$http.post<string>(AccountService.baseUrl, { method: "createUser", user: user})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    }
    remove(user: User) {
      return this.$http.post<string>(AccountService.baseUrl, { method: "removeUser", user: user})
      .then((response) => {
        if (response.data != "ok"){
          alert("Не удалось удалить пользователя");
          return undefined;
        }

        return response.data;
      },
        (r) => {
          return this.$q.reject(undefined);
        }
      );
    }

    restoreSession(): ng.IPromise<User | void> {
      let user = this.getKeyStorage();
      if(user.email && user.email && user.email.length > 1 && user.email.length > 1)
        return this.getUser({email: user.email, password: user.password});
      else 
        return this.$q.when();
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