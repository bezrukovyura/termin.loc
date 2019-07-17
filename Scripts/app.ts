/// <reference path="../Scripts/etc/angular.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/lodash/index.d.ts" />
/// <reference path="../Scripts/Services/TranslateService/TranslateService.ts" />

declare var moment: any;

angular.module('termin', ['ngMaterial', 'ngMessages'])
  .service("AccountService", Termin.Services.AccountService)
  .service("StorageService", Termin.Services.StorageService)
  .service("ConverterService", Termin.Services.ConverterService)
  .service("TabService", Termin.Services.TabService)
  .service("TranslateService", Termin.Services.TranslateService)
  .component("formInputComponent", Termin.Components.FormInputComponent)
  .component("loginAccessComponent", Termin.Components.LoginAccessComponent)
  .component("calendarComponent", Termin.Components.CalendarComponent)
  .component("usersEditorComponent", Termin.Components.UsersEditorComponent)
  .config(
    function ($mdDateLocaleProvider: any) {

      let lang = <Termin.Services.Language>localStorage.getItem("Language") || Termin.Services.Language.en;
      if (lang === Termin.Services.Language.en) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $mdDateLocaleProvider.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $mdDateLocaleProvider.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $mdDateLocaleProvider.shortDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        $mdDateLocaleProvider.formatDate = function (date: any) {
          return moment(date).format('YYYY-MM-DD');
        };
      }
      if(lang === Termin.Services.Language.de) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.months = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'];
        $mdDateLocaleProvider.shortMonths = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'];
        $mdDateLocaleProvider.days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        $mdDateLocaleProvider.shortDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        $mdDateLocaleProvider.formatDate = function (date: any) {
          return moment(date).format('YYYY-MM-DD');
        };
      }
      // $mdDateLocaleProvider.firstDayOfWeek = 1;
      // $mdDateLocaleProvider.months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      // $mdDateLocaleProvider.shortMonths = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      // $mdDateLocaleProvider.days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
      // $mdDateLocaleProvider.shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      // $mdDateLocaleProvider.formatDate = function (date: any) {
      //   return moment(date).format('YYYY-MM-DD');
      // };


    }
  )
  .controller('myCtrl', Termin.Components.TerminController);