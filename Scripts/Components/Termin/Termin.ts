namespace Termin.Components {

    export class TerminController implements ng.IController {

        static $inject: string[] = ["$scope", "StorageService", "TabService", "AccountService"];

        constructor(
            private $scope: ng.IScope, 
            private storageService: Services.StorageService, 
            private tabService: Services.TabService,
            private accountService: Services.AccountService
            ) { }

        public showProgressBar: boolean = false;

        public exit() {
            debugger
            this.accountService.exit();
            this.accountService.user = undefined;
            this.$scope.userRole = {level: -1}
        }


        $onInit?(): void {
            
            this.$scope.tab = this.tabService;

            this.$scope.userRole = {
                level: -1,
                name: ""
            };

            this.$scope.$watch("myCtrl.storageService.UnitToEdit", (valNew: Unit) => {
                if (valNew && valNew !== null) {
                    this.storageService.UnitToEdit = valNew;
                    this.$scope.tab = {i: 2};
                }
            });

        }


    }


}
