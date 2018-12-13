namespace Termin.Services {


  export class StorageService {

    static $inject: string[] = ["$http", "$q", "ConverterService"];

    private static baseUrl = "/php/terms.php";
    private static storagePath = "units";

    constructor(private $http: angular.IHttpService, private $q: angular.IQService, private ConverterService: ConverterService) { }

    UnitToEdit: Unit;

    /** Получить записи за указанную дату */
    get(date: string): ng.IPromise<Unit[]> {
      return this.$http.post<Unit[]>(StorageService.baseUrl, {method: "getterms", date: date})
        .then((response) => {

          let tmp_unit: Unit[] = [];
          response.data.forEach(x=>{
            tmp_unit.push(this.ConverterService.dateBirthdayParse(x));
          });

          return tmp_unit;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    /** Последний чекнутый тернин */
    getTermsLastChecked(): ng.IPromise<Unit> {
      return this.$http.post<Unit[]>(StorageService.baseUrl, {method: "gettermslastchecked"})
        .then((response) => {

          let tmp_unit: Unit[] = [];
          response.data.forEach(x=>{
            tmp_unit.push(this.ConverterService.dateBirthdayParse(x));
          });
          if(tmp_unit.length == 1)
            return tmp_unit[0];
          console.error("getTermsLastChecked not found");
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    /** Узнать, существует ли другая запись на это время */
    isReserviert(unit: Unit): ng.IPromise<boolean> {
      return this.get(unit.date).then(x=>{
        let existOtherTermin = false;
        x.forEach(y=> {
          if(y.hour === unit.hour && y.minute === unit.minute && y.id != unit.id)
            existOtherTermin = true;
        });
        return existOtherTermin;
      });
    }

    save(unit: Unit): ng.IPromise<boolean> {

      return this.$http.post<string>(StorageService.baseUrl, { method: "setterms", jsonArray: this.ConverterService.dateBirthdayStringify(unit)})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    update(unit: Unit): ng.IPromise<boolean> {
      
      return this.$http.post<string>(StorageService.baseUrl, { method: "updateterms", jsonArray: this.ConverterService.dateBirthdayStringify(unit)})
        .then((response) => {
          return response.data == "ok" ? true : false;
        },
          (r) => {
            return this.$q.reject(r.data);
          }
        );
    };

    delete(unit: Unit){
      return this.$http.post<string>(StorageService.baseUrl, { method: "deleteterms", jsonArray: unit})
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