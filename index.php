﻿<?php
  //session_start();
?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/png" href="img/icon.png" />
  <title>Termin</title>
  <link rel="stylesheet" href="./Styles/app.css" type="text/css" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.css">

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-animate.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-aria.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-messages.min.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.js"></script>

  <script src="./node_modules/moment/min/moment.min.js"></script>
  <script src="./node_modules/lodash/lodash.min.js"></script>
  <script src="./node_modules/js-md5/build/md5.min.js"></script>

  <script src="./Scripts/Components/Termin/Termin.js"></script>

  <script src="./Scripts/Services/AccountService.js"></script>
  <script src="./Scripts/Services/StorageService.js"></script>
  <script src="./Scripts/Services/ConverterService.js"></script>
  <script src="./Scripts/Services/TabService.js"></script>

  <script src="./Scripts/Components/FormInput/FormInput.js"></script>
  <script src="./Scripts/Components/LoginAccess/LoginAccess.js"></script>
  <script src="./Scripts/Components/Calendar/Calendar.js"></script>
  <script src="./Scripts/app.js"></script>

</head>

<style>
  .pointer {
    cursor: pointer;
  }

  md-progress-linear .md-container {
    height: 20px;
  }

  md-progress-linear .md-container.md-mode-query .md-bar2 {
    height: 100%;
  }

  md-progress-linear {
    position: absolute;
    bottom: 15px;
  }
  md-progress-linear .md-bar {
    background-color: red !important;
}
</style>

<body ng-app="termin" ng-controller="myCtrl">

  <div layout="column" layout-fill>

    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2 md-truncate flex>Система - Термин</h2>

        <md-button ng-click="exit()" ng-if="userRole.name">
          {{userRole.name}} - Выход
        </md-button>
      </div>
    </md-toolbar>

    <md-content>
      <md-tabs md-selected="tab.active" class="md-dynamic-height">
        <md-tab label="Авторизация" ng-if="userRole.level==-1">
          <login-access-component show-progress-bar="myCtrl.showProgressBar" user-role="userRole" />
        </md-tab>
        <md-tab label="Календарь" ng-if="userRole.level>-1">
          <calendar-component show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="Добавление" ng-if="userRole.level>-1">
          <form-input-component show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="Пользователи" ng-if="userRole.level>0"></md-tab>
      </md-tabs>
    </md-content>

    <md-progress-linear ng-show="myCtrl.showProgressBar" md-mode="query"></md-progress-linear>

  </div>



</body>

</html>