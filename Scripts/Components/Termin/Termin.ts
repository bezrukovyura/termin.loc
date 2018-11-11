namespace Termin.Components {

    export class TerminController implements ng.IController {

        static $inject: string[] = ["$scope", "StorageService", "AccountService"];

        constructor(private $scope: ng.IScope, private storageService: Services.StorageService, private accountService: Services.AccountService) { }

        public toEdit: Unit = {name: ""};
        public showProgressBar: boolean = false;

        $onInit?(): void {
            
            this.$scope.userRole = {
                level: -1,
                name: ""
            };



            this.$scope.$watch("myCtrl.toEdit", (valNew: Unit) => {
                debugger
                if (valNew && valNew !== null) {
                    this.storageService.UnitToEdit = valNew;
                    this.$scope.indexTab = 2;
                }

            });

        }



    }



}
