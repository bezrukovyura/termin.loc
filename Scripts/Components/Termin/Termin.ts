namespace Termin.Components {

    export class TerminController implements ng.IController {

        static $inject: string[] = ["$scope", "StorageService", "TabService", "AccountService", "TranslateService"];

        constructor(
            private $scope: ng.IScope, 
            private storageService: Services.StorageService, 
            private tabService: Services.TabService,
            private accountService: Services.AccountService,
            public translateService :Termin.Services.TranslateService
            ) { }

        public showProgressBar: boolean = false;


        $onInit?(): void {
            debugger
            this.$scope.l = this.translateService;
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

            this.$scope.exit = ()=> {
                this.accountService.exit();
                this.accountService.user = undefined;
                this.$scope.userRole = {level: -1}
            };

        }


    }


}
