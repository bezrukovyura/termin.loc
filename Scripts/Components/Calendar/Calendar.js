var Termin;
(function (Termin) {
    var Components;
    (function (Components) {
        var AllStrings = (function () {
            function AllStrings() {
            }
            return AllStrings;
        }());
        var CalendarController = (function () {
            function CalendarController($scope, storageService, converter, tabs, $mdDialog) {
                var _this = this;
                this.$scope = $scope;
                this.storageService = storageService;
                this.converter = converter;
                this.tabs = tabs;
                this.$mdDialog = $mdDialog;
                this.roleAdmin = false;
                this.dateEdit = this.converter.date(new Date());
                this.update = function () {
                    _this.init(_this.converter.date(_this.dateEdit));
                };
                this.allStrings = { first: [], second: [] };
                this.allDays = [];
                this.toChangeClass = false;
                this.toChangeOk = false;
                this.toChange = [];
                this.isFinalCommit = false;
                this.countsDay = [
                    1, 2, 5, 7, 30
                ];
                this.selectCountDays = 1;
            }
            CalendarController.prototype.$onInit = function () {
                var _this = this;
                this.roleAdmin = this.role == 1 ? true : false;
                this.$scope.$watch("ctrl.tabs.active", function (x) {
                    if (x == 0)
                        _this.update();
                });
            };
            CalendarController.prototype.createAllEmptyString = function (date, fromHour, toHour, interval) {
                if (fromHour === void 0) { fromHour = 6; }
                if (toHour === void 0) { toHour = 20; }
                if (interval === void 0) { interval = 30; }
                var strings = [];
                for (var i = fromHour; i < toHour; i++) {
                    for (var j = 0; j < 60; j += interval) {
                        strings.push({ date: date, hour: this.converter.time(i), minute: this.converter.time(j) });
                    }
                }
                return strings;
            };
            CalendarController.prototype.changeTermins = function () {
                var _this = this;
                if (!this.toChangeClass) {
                    this.toChangeClass = true;
                }
                else {
                    if (this.toChange.length == 2) {
                        var tmp0 = _.cloneDeep(this.toChange[0]);
                        tmp0.date = this.toChange[1].date;
                        tmp0.hour = this.toChange[1].hour;
                        tmp0.minute = this.toChange[1].minute;
                        var tmp1_1 = _.cloneDeep(this.toChange[1]);
                        tmp1_1.date = this.toChange[0].date;
                        tmp1_1.hour = this.toChange[0].hour;
                        tmp1_1.minute = this.toChange[0].minute;
                        this.storageService.update(tmp0).then(function (x) {
                            if (x)
                                _this.storageService.update(tmp1_1).then(function (y) {
                                    if (y) {
                                        _this.update();
                                        _this.toChangeOk = false;
                                    }
                                    else
                                        alert("Не удалось поменять местами");
                                });
                            else
                                alert("Не удалось поменять местами");
                        });
                    }
                    this.toChangeClass = false;
                    this.toChange = [];
                }
            };
            CalendarController.prototype.addToChange = function (unit) {
                if (!unit.id)
                    return;
                if (this.toChange.length < 3)
                    this.toChange.push(unit);
                else {
                    this.toChange = [];
                    this.toChange.push(unit);
                }
                this.toChangeOk = this.toChange.length == 2;
            };
            CalendarController.prototype.finalCommit = function () {
                this.isFinalCommit = !this.isFinalCommit;
            };
            CalendarController.prototype.finalCommitDialog = function (unit) {
                var _this = this;
                if (!unit.id)
                    return;
                this.terminReceptionObject = unit;
                this.setVisitDateNumber().then(function (x) { return _this.terminReception = x; });
                this.$mdDialog.show({
                    contentElement: '#mdStaticDialog',
                    parent: angular.element(document.body)
                });
            };
            CalendarController.prototype.finalCommitDialogClose = function () {
                this.$mdDialog.hide(alert, "finished");
                this.terminReception = undefined;
            };
            CalendarController.prototype.terminReceptionApply = function () {
                var _this = this;
                this.isUniqVisitDateNumber().then(function (z) {
                    if (!z) {
                        alert("error save. not uniq or not correct");
                        _this.setVisitDateNumber().then(function (x) { return _this.terminReception = x; });
                        return;
                    }
                    _this.terminReceptionObject.visitDateNumber = _this.terminReception;
                    _this.storageService.update(_this.terminReceptionObject).then(function (x) {
                        if (x) {
                            _this.update();
                            _this.finalCommitDialogClose();
                        }
                        else
                            alert("Не удалось сохранить");
                    });
                });
            };
            CalendarController.prototype.init = function (date) {
                var _this = this;
                debugger;
                date = this.converter.stringToDate(date);
                this.allDays = new Array(this.selectCountDays);
                var _loop_1 = function (i) {
                    var datepoint = new Date(new Date(date).getTime() + 86400000 * i);
                    var stringDate = this_1.converter.date(datepoint);
                    if (!dates.includes(stringDate)) {
                        var dayOfWeek = datepoint.getUTCDay();
                        if ( dayOfWeek < 5 ) {
                            this_1.storageService.get(stringDate).then(function (x) {
                                debugger;                                
                                _this.allDays[i] = _this.render(stringDate, x, "");
                            });
                        } else {
                            this_1.storageService.get(stringDate).then(function (x) {
                                _this.allDays[i] = _this.render(stringDate, x, "This is a weekend");
                            });
                        }  
                    } else {
                        this_1.storageService.get(stringDate).then(function (x) {
                            _this.allDays[i] = _this.render(stringDate, x, "This is a nonworking day");
                        });
                    }
                };
                var this_1 = this;
                for (var i = 0; i < this.allDays.length; i++) {
                    _loop_1(i);
                }
            };
            CalendarController.prototype.render = function (date, exist, warning) {
                var units = this.createAllEmptyString(date);
                var prepareUnits = [];
                if (exist)
                    units.forEach(function (x) {
                        var find = exist.filter(function (y) { return y.date == x.date && y.hour == x.hour && y.minute == x.minute; });
                        prepareUnits.push(find && find.length && find.length > 0 ? find[0] : x);
                    });
                else
                    prepareUnits = units;
                return {
                    first: prepareUnits.slice(0, prepareUnits.length / 2),
                    second: prepareUnits.slice(prepareUnits.length / 2, prepareUnits.length),
                    date: date,
                    warning: warning
                };
            };
            CalendarController.prototype.warning = function (date) {
                return {
                    date: date
                };
            };
            CalendarController.prototype.onEdit = function (unit) {
                this.storageService.UnitToEdit = unit;
                this.tabs.setActive(1);
            };
            CalendarController.prototype.offsetHeightThreeWeek = function () {
                if (!this.is30Days())
                    return undefined;
                return document.querySelector('.oneDay.day0').offsetHeight + document.querySelector('.oneDay.day7').offsetHeight + document.querySelector('.oneDay.day14').offsetHeight;
            };
            CalendarController.prototype.is30Days = function () {
                return this.selectCountDays == 30;
            };
            CalendarController.prototype.setPrintStyle = function (isPrint) {
                if (isPrint) {
                    var temp = document.createElement('div');
                    temp.id = "printStyle";
                    temp.innerHTML = '<style id="printStyle">md-toolbar._md,md-tabs-wrapper,.nowDate {display: none}</style>';
                    document.getElementById('toPrint').appendChild(temp.firstChild);
                    document.getElementById('toPrint').style.width = this.is30Days ? "1500px" : "1200px";
                }
                else {
                    document.getElementById('printStyle').outerHTML = "<font></font>";
                    document.getElementById('toPrint').style.width = "";
                }
            };
            CalendarController.prototype.openPdf = function () {
                var _this = this;
                debugger;
                this.setPrintStyle(true);
                html2canvas(document.getElementById('toPrint'), { height: this.offsetHeightThreeWeek() })
                    .then(function (canvas) {
                    debugger;
                    var page1 = canvas.toDataURL();
                    html2canvas(document.getElementById('toPrint'), { y: 30 + _this.offsetHeightThreeWeek() })
                        .then(function (canvas) {
                        debugger;
                        var page2 = canvas.toDataURL();
                        var docDefinition;
                        if (_this.is30Days())
                            docDefinition = {
                                info: {
                                    title: 'Termin calendar',
                                },
                                content: [{
                                        image: page1,
                                        width: 500,
                                        pages: 2,
                                        startPosition: {
                                            pageNumber: 1
                                        }
                                    },
                                    {
                                        image: page2,
                                        width: 500,
                                        startPosition: {
                                            pageNumber: 2
                                        }
                                    }]
                            };
                        else
                            docDefinition = {
                                info: {
                                    title: 'Termin calendar',
                                },
                                content: [{
                                        image: page1,
                                        width: 500,
                                        pages: 2,
                                        startPosition: {
                                            pageNumber: 1
                                        }
                                    }]
                            };
                        pdfMake.createPdf(docDefinition).download();
                        _this.setPrintStyle(false);
                    });
                });
            };
            CalendarController.prototype.setVisitDateNumber = function () {
                return this.storageService.getTermsLastChecked().then(function (x) {
                    var arr = x.visitDateNumber.split("/");
                    var currentId = +arr[0];
                    var year = "" + new Date().getFullYear();
                    var currentYear = year[2] + year[3];
                    return (currentId + 1) + "/" + currentYear;
                });
            };
            CalendarController.prototype.isUniqVisitDateNumber = function () {
                var _this = this;
                return this.setVisitDateNumber().then(function (x) {
                    var arr = x.split("/");
                    var currentId = +arr[0] - 1;
                    var year = "" + new Date().getFullYear();
                    var currentYear = year[2] + year[3];
                    var arr1 = _this.terminReception.split("/");
                    var currentIdWritten = +arr1[0];
                    var currentYearWritten = arr1[1];
                    return currentIdWritten > currentId && currentYearWritten == currentYear;
                });
            };
            CalendarController.$inject = ["$scope", "StorageService", "ConverterService", "TabService", "$mdDialog"];
            return CalendarController;
        }());
        Components.CalendarComponent = {
            bindings: {
                tab: "=",
                role: "="
            },
            controller: CalendarController,
            controllerAs: "ctrl",
            templateUrl: "./Scripts/Components/Calendar/Calendar.html",
        };
    })(Components = Termin.Components || (Termin.Components = {}));
})(Termin || (Termin = {}));
