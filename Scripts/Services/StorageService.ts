namespace Termin.Services {


    export class StorageService {

        static $inject: string[] = ["$http", "$q"];

        private static baseUrl = "/Units/";
        private static storagePath = "units";

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }

        unitSave(unit: Unit) {
            let allUnit;
            try {
                allUnit = <Unit[]>JSON.parse(localStorage.getItem(StorageService.storagePath));
                allUnit.push(unit);
            }
            catch{
                allUnit = [unit]
            }
            localStorage.setItem(StorageService.storagePath, JSON.stringify(allUnit));
        }

        unitGetAll(): Unit[] {
            return <Unit[]>JSON.parse(localStorage.getItem(StorageService.storagePath));
        }

        getDay(count: number){
            

        }
        
        UnitToEdit: Unit;

    }
}