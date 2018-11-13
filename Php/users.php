<?php

 // session_start();

  
  header('Access-Control-Allow-Origin: *'); 

  require_once "rest.php";

  $rest = new RestServer(TermsService);
  $rest->handle();

  class TermsService
  {
     public static function getRole($user)
     {

      $password = $user["password"];
      $email = $user["email"];

      $connection = mysqli_connect("localhost","admin","password1","termin") or die("Error " . mysqli_error($connection));
      $sql = "select * FROM users WHERE `password`='$password' AND `email`='$email'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      $emparray = array();
      while($row =mysqli_fetch_assoc($result))
      {
          $emparray[] = $row;
      }

      mysqli_close($connection);

      if(count($emparray) == 1) {
        if(isset($_SESSION['userLevel'])) {
          unset($_SESSION['userLevel']);
        }
        $_SESSION['userLevel'] = $emparray[0]["role"];

      }
      return json_encode($emparray);
      
     }

     public static function logout() 
     {
      if(isset($_SESSION['userLevel'])) {
        unset($_SESSION['userLevel']);
      }
     }


     public static function allUsers()
     {
      $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));
      $sql = "select * from users";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      $emparray = array();
      while($row =mysqli_fetch_assoc($result))
      {
          $emparray[] = $row;
      }
      
      mysqli_close($connection);

      return json_encode($emparray);
     }


     public static function removeUser($user)
     {
      $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));
      $id = $user["id"];
      $sql = "DELETE FROM users WHERE id='$id'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
      mysqli_close($connection);
      return "ok";
     }
     
     
  }


?>