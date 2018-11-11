<?php

print_r($_SESSION);
print_r($_SESSION['userLevel']);

if(!isset($_SESSION['userLevel']) || !( $_SESSION['userLevel'] == 0 || $_SESSION['userLevel'] == 1)) {

    return "Access denied..." . $_SESSION['userLevel']  . isset($_SESSION['userLevel']);
  }
  
?>