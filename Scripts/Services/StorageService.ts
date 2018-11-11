namespace Termin.Services {


  export class StorageService {

    static $inject: string[] = ["$http", "$q"];

    private static baseUrlGetUnit = "/php/rest.php";
    private static baseUrlSetUnit = "/php/rest.php";
    private static storagePath = "units";

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }

    UnitToEdit: Unit;

    get(date: string): ng.IPromise<Unit[]> {
      return this.$http.post<Unit[]>(StorageService.baseUrlGetUnit, {method: "getterms", date: date})
        .then((response) => {
          return response.data;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };


    save(unit: Unit): ng.IPromise<boolean> {
      return this.$http.post<string>(StorageService.baseUrlSetUnit, { method: "setterms", jsonArray: unit})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    update(unit: Unit): ng.IPromise<boolean> {
      return this.$http.post<string>(StorageService.baseUrlSetUnit, { method: "updateterms", jsonArray: unit})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    delete(unit: Unit){
      return this.$http.post<string>(StorageService.baseUrlSetUnit, { method: "deleteterms", jsonArray: unit})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    }

  }
}