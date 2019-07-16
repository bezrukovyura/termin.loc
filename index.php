<?
error_reporting(E_ALL);
ini_set("display_errors", 1);
include_once "calendar.php";
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
  <script src="./Scripts/Services/TranslateService/TranslateService.js"></script>

  <script src="./Scripts/Components/FormInput/FormInput.js"></script>
  <script src="./Scripts/Components/LoginAccess/LoginAccess.js"></script>
  <script src="./Scripts/Components/Calendar/Calendar.js"></script>
  <script src="./Scripts/Components/UsersEditor/UsersEditor.js"></script>
  <script src="./Scripts/Components/Dayoff/Dayoff.js"></script>
  <script src="./Scripts/app.js"></script>
  <script>let dates = <? echo (Calendar::get() ? Calendar::get() : '[]'); ?>;</script>
  <script src="./Scripts/jquery.js"></script>
  <script src="./Scripts/jquery-app.js"></script>

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
.langSelect, .langSelect * {
    color: #d2d2d2;
    padding: 0;
    margin: 0;
    font-size: 18px;
}

.langSelect {
    margin: 0 10px 0 0;
}
.row {
  max-width: 1170px;
  margin: 0 auto;
}
.calendar-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.month {
  width: calc(100% / 3);
  padding: 10px 15px;
  box-sizing: border-box;
}
.month-table td {
  cursor: pointer;
}
.month-table td:nth-child(6), .month-table td:nth-child(7) {
  color: red;
}
.date--selected:not(.md-calendar-date), .md-calendar-date.date--selected span {
  background: green;
  color: white;
}
.md-calendar-date:nth-last-child(-n+2) span {
  background: red;
  color: white;
}

@media(max-width: 950px) {
  .month {width: 50%;}
}
@media(max-width: 767px) {
  .month {width: 100%;}
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
        <h2 md-truncate flex>{{l.get().title}}</h2>
        
        <md-select ng-change="l.update()" ng-model="l.language" placeholder="en" class="langSelect">
          <md-option ng-value="x" ng-repeat="x in l.listLanguages">{{x}}</md-option>
        </md-select>

        <md-button ng-click="exit()" ng-if="userRole.name">
          {{userRole.name}} - {{l.get().exit}}
        </md-button>
      </div>
    </md-toolbar>

    <md-content>
      <md-tabs md-selected="tab.active" class="md-dynamic-height">
        <md-tab label="{{l.get().authorization}}" ng-if="userRole.level==-1">
          <login-access-component show-progress-bar="myCtrl.showProgressBar" user-role="userRole" />
        </md-tab>
        <md-tab label="{{l.get().calendar}}" ng-if="userRole.level>-1">
          <calendar-component role="userRole.level" show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="{{l.get().additional}}" ng-if="userRole.level>-1">
          <form-input-component role="userRole.level" show-progress-bar="myCtrl.showProgressBar" />
        </md-tab>
        <md-tab label="{{l.get().users}}" ng-if="userRole.level>0"><users-editor-component /></md-tab>
        <md-tab label="{{l.get().dayoff}}" ng-if="userRole.level>0">
          <div class="row">
            <div class="calendar-row">
              <? for ($i = 1; $i <=12; $i++): ?>
                <div class="month">
                  <div class="month-title"><? echo Calendar::monthName($i); ?></div>
                  <div class="month-table"><? echo Calendar::month2table($i, Calendar::year2array(date('Y'))); ?></div>
                </div>
              <? endfor; ?>            
            </div>
            <div class="save-row">
              <form class="dates-fomr">
                <input type="hidden" name="dates" id="dates">
                <input id="save-dates" type="submit" value="{{l.get().save}}">
              </form>
            </div>
          </div>
        </md-tab>
      </md-tabs>
    </md-content>

    <md-progress-linear ng-show="myCtrl.showProgressBar" md-mode="query"></md-progress-linear>

  </div>



</body>

</html>