<?php
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

      return json_encode($emparray);
      
     }

    
     
  }


?>