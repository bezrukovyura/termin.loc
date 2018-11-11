<?php
  header('Access-Control-Allow-Origin: *'); 

  require_once "RestServer.php";
  require_once "database.php";

  $rest = new RestServer(TermsService);
  $rest->handle();

  class TermsService
  {
     public static function getterms($date)
     {
      $connection = mysqli_connect("localhost","admin","password1","termin") or die("Error " . mysqli_error($connection));
      $sql = "select * from termins WHERE `date`='$date'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      $emparray = array();
      while($row =mysqli_fetch_assoc($result))
      {
          $emparray[] = $row;
      }
      return json_encode($emparray);
      
      mysqli_close($connection);
     }

     public static function setterms($jsonArray)
     {
      $connection = mysqli_connect("localhost","admin","password1","termin") or die("Error " . mysqli_error($connection));

      $date = $jsonArray["date"];
      $hour = $jsonArray["hour"];
      $minute = $jsonArray["minute"];
      $fam = $jsonArray["fam"];
      $name = $jsonArray["name"];
      $birthday = $jsonArray["birthday"];
      $phone1 = $jsonArray["phone1"];
      $phone2 = $jsonArray["phone2"];
      $region = $jsonArray["region"];
      $insurance = $jsonArray["insurance"];
      $zuweiser = $jsonArray["zuweiser"];
      $comments = $jsonArray["comments"];
      $userRegister = $jsonArray["userRegister"];
      $visitDateNumber = $jsonArray["visitDateNumber"];

      $sql = "INSERT INTO termins (`date`, hour, minute, fam, `name`, birthday, phone1, phone2, region, insurance, zuweiser, comments, userRegister, visitDateNumber) VALUES ('$date', '$hour', '$minute', '$fam', '$name', '$birthday', '$phone1', '$phone2', '$region', '$insurance', '$zuweiser', '$comments', '$userRegister', '$visitDateNumber')";

      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      return "ok";
      
      mysqli_close($connection);
     }

     public static function updateterms($jsonArray)
     {
      $connection = mysqli_connect("localhost","admin","password1","termin") or die("Error " . mysqli_error($connection));

      $date = $jsonArray["date"];
      $id = $jsonArray["id"];
      $hour = $jsonArray["hour"];
      $minute = $jsonArray["minute"];
      $fam = $jsonArray["fam"];
      $name = $jsonArray["name"];
      $birthday = $jsonArray["birthday"];
      $phone1 = $jsonArray["phone1"];
      $phone2 = $jsonArray["phone2"];
      $region = $jsonArray["region"];
      $insurance = $jsonArray["insurance"];
      $zuweiser = $jsonArray["zuweiser"];
      $comments = $jsonArray["comments"];
      $userRegister = $jsonArray["userRegister"];
      $visitDateNumber = $jsonArray["visitDateNumber"];

//UPDATE  `termin`.`termins` SET  `hour` =  '08',`fam` =  'Piter123',`name` =  'Pan12334' WHERE  `termins`.`id` =1;

      $sql = "UPDATE termin.termins SET `date`='$date', hour='$hour', minute='$minute', fam='$fam', `name`='$name', birthday='$birthday', phone1='$phone1', phone2='$phone2', region='$region', insurance='$insurance', zuweiser='$zuweiser', comments='$comments', userRegister='$userRegister', visitDateNumber='$visitDateNumber' WHERE termins.id='$id'";

      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      return "ok";
      
      mysqli_close($connection);
     }

      public static function deleteterms($jsonArray) {
        $connection = mysqli_connect("localhost","admin","password1","termin") or die("Error " . mysqli_error($connection));
        $id = $jsonArray["id"];
        $sql = "DELETE FROM termins WHERE id='$id'";
        $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
        return "ok";
        mysqli_close($connection);
      }
     
  }

?>