<?php
  header('Access-Control-Allow-Origin: *'); 

  require_once "rest.php";

  $rest = new RestServer(TermsService);
  $rest->handle();

  class TermsService
  {
     public static function getterms($date)
     {
      $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));
      $sql = "select * from termins WHERE `date`='$date'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      $emparray = array();
      while($row =mysqli_fetch_assoc($result))
      {
          $emparray[] = $row;
      }
      
      mysqli_close($connection);

      return json_encode($emparray);
     }

     public static function setterms($jsonArray)
     {

      $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));

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

      mysqli_close($connection);

      return "ok";
    }

     public static function updateterms($jsonArray)
     {

      $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));

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

      $sql = "UPDATE termin.termins SET `date`='$date', hour='$hour', minute='$minute', fam='$fam', `name`='$name', birthday='$birthday', phone1='$phone1', phone2='$phone2', region='$region', insurance='$insurance', zuweiser='$zuweiser', comments='$comments', userRegister='$userRegister', visitDateNumber='$visitDateNumber' WHERE termins.id='$id'";

      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      mysqli_close($connection);

      return "ok";
     }

      public static function deleteterms($jsonArray) {
        $connection = mysqli_connect("localhost","bezrukovyra","password1","bezrukovyra_dev2") or die("Error " . mysqli_error($connection));
        $id = $jsonArray["id"];
        $sql = "DELETE FROM termins WHERE id='$id'";
        $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
        mysqli_close($connection);
        return "ok";
      }
     
  }


?>