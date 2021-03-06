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

      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error DB connect" . mysqli_error($connection));
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


     

     public static function createUser($user)
     {

      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));

      $name = $user["name"];
      $password = $user["password"];
      $email = $user["email"];
      $role = $user["role"];

      $sql = "INSERT INTO users (`name`, `password`, email, `role`) VALUES ('$name', '$password', '$email', '$role')";

      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      mysqli_close($connection);

      return "ok";
    }


     public static function updateUser($user)
     {
      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));

      $password = $user["password"]; 
      $email = $user["email"];
      $id = $user["id"];
      $name = $user["name"];
      $role = $user["role"];

      $sql = "UPDATE bezrukovyra_dev2.users SET `password`='$password', email='$email', name='$name', role='$role'  WHERE users.id='$id'";

      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      mysqli_close($connection);

      return "ok";
      
     }


     public static function logout() 
     {
      if(isset($_SESSION['userLevel'])) {
        unset($_SESSION['userLevel']);
      }
     }


     public static function allUsers()
     {
      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));
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
      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));
      $id = $user["id"];
      $sql = "DELETE FROM users WHERE id='$id'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
      mysqli_close($connection);
      return "ok";
     }
     
     
  }


?>