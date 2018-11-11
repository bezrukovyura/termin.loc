namespace Termin.Components {

    export class TerminController implements ng.IController {

        static $inject: string[] = ["$scope", "StorageService"];

        constructor(private $scope: ng.IScope, private storageService: Services.StorageService) { }

        public toEdit: Unit;
        public indexTab: number = 2;

        public showProgressBar: boolean = false;

        $onInit?(): void {


            this.$scope.$watch("myCtrl.toEdit", (valNew: Unit) => {

                if (valNew && valNew !== null) {
                    this.storageService.UnitToEdit = valNew;
                    this.$scope.indexTab = 2;
                }

            });

        }



    }



}
