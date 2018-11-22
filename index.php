<?php
  //session_start();
?>

<!DOCTYPE html>

<html>

<head>
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
  <meta charset="utf-8" />
  <meta http-equiv="content-language" content="ru" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="icon" type="image/png" href="img/icon.png" />
  <title>Termin</title>

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="./Scripts/vendors.css">

  <script src="./Scripts/vendors.js"></script>

  <script src="./Scripts/Components/Termin/Termin.js"></script>

  <script src="./Scripts/Services/AccountService.js"></script>
  <script src="./Scripts/Services/StorageService.js"></script>
  <script src="./Scripts/Services/ConverterService.js"></script>
  <script src="./Scripts/Services/TabService.js"></script>

  <script src="./Scripts/Components/FormInput/FormInput.js"></script>
  <script src="./Scripts/Components/LoginAccess/LoginAccess.js"></script>
  <script src="./Scripts/Components/Calendar/Calendar.js"></script>
  <script src="./Scripts/Components/UsersEditor/UsersEditor.js"></script>
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
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative; 
  margin: 0; 
}
@media(max-width: 600px) {
  .md-toolbar-tools .md-truncate {
      display: none;
  }

  .md-toolbar-tools button {
      font-size: 10px;
  }
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
          <calendar-component role="userRole.level" show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="Добавление" ng-if="userRole.level>-1">
          <form-input-component role="userRole.level" show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="Пользователи" ng-if="userRole.level>0"><users-editor-component /></md-tab>
      </md-tabs>
    </md-content>

    <md-progress-linear ng-show="myCtrl.showProgressBar" md-mode="query"></md-progress-linear>

  </div>



</body>

</html>