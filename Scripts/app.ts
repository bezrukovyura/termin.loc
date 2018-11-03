/// <reference path="../node_modules/@types/angularjs/angular.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

angular.module('termin', ['ngMaterial', 'ngMessages'])
  .service("AccountService", Termin.Services.AccountService)
  .component("formInputComponent", Termin.Components.FormInputComponent)
  .component("loginAccessComponent", Termin.Components.LoginAccessComponent);