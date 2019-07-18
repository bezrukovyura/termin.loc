<? 
  require_once "rest.php";
  
  global $dates_array;
  $dates_array = Calendar::dates_array();

  class Calendar {
    public static function save($jsonArray, $year) {
      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));
      $sql = "select * from dayoffs WHERE `year`='$year'";//check if year exists in DB
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

      if (mysqli_fetch_assoc($result) == "") {
        $sql = "INSERT INTO dayoffs (`year`, dates) VALUES ('$year', '$jsonArray')";
        $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
      } else {
        $sql = "UPDATE dayoffs SET `dates` = '$jsonArray' WHERE `year`='$year'";
        $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
      }

      mysqli_close($connection);

      return "ok";
    }

    public static function get() {
      $connection = mysqli_connect("localhost", DB::$name, DB::$password, DB::$login) or die("Error " . mysqli_error($connection));
      $sql = "select * from dayoffs WHERE `year`='".date("Y")."'";
      $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
   
      $result = mysqli_fetch_assoc($result);
      //var_dump($emparray);

      mysqli_close($connection);
   
      return $result['dates'];
    }

    public static function year2array($year) {
      $res = $year >= 1970;
      if ($res) {
        // this line gets and sets same timezone, don't ask why :)
        date_default_timezone_set(date_default_timezone_get());
  
        $dt = strtotime("-1 day", strtotime("$year-01-01 00:00:00"));
        $res = array();
        $week = array_fill(1, 7, false);
        $last_month = 1;
        $w = 1;
        do {
          $dt = strtotime('+1 day', $dt);
          $dta = getdate($dt);
          $wday = $dta['wday'] == 0 ? 7 : $dta['wday'];
          if (($dta['mon'] != $last_month) || ($wday == 1)) {
            if ($week[1] || $week[7]) $res[$last_month][] = $week;
            $week = array_fill(1, 7, false);
            $last_month = $dta['mon'];
            }
          $week[$wday] = $dta['mday'];
          }
        while ($dta['year'] == $year);
        }
      return $res;
    }
    public static function month2table($month, $calendar_array) { 
      global $dates_array;

      $ca = 'align="center"';
      $res = "<table cellpadding=\"2\" cellspacing=\"1\" style=\"border:solid 1px #000000;font-family:tahoma;font-size:12px;background-color:#ababab\"><tr><td $ca>Mo</td><td $ca>Tu</td><td $ca>We</td><td $ca>Th</td><td $ca>Fr</td><td $ca>Sa</td><td $ca>Su</td></tr>";
      foreach ($calendar_array[$month] as $week) {
        $res .= '<tr>';
        foreach ($week as $day) {

          $selectedDay = ($day) ? Calendar::thisDate($day, $month) : '';
          $class = (in_array($selectedDay, $dates_array, true)) ? "date date--selected" : "date";

          $res .= '<td class="'.$class.'" align="right" width="20" bgcolor="#ffffff" '. ($day ? 'data-date="'.Calendar::thisDate($day, $month).'"' : '') .'>' . ($day ? $day : '&nbsp;') . '</td>';
        }
        $res .= '</tr>';
      }
      $res .= '</table>';
      return $res;
    }
    public static function monthName($month) {
      $dateObj   = DateTime::createFromFormat('!m', $month);
      $monthName = $dateObj->format('F');
      return $monthName;
    }
    public static function thisDate($day, $month) {
      $year = date('Y');
      $dateObj   = DateTime::createFromFormat('j', $day);
      $day = $dateObj->format('d');
      $dateObj   = DateTime::createFromFormat('n', $month);
      $month = $dateObj->format('m');
      return sprintf('%s-%s-%s', $year, $month, $day);
    }

    public static function dates_array() {
      return json_decode(Calendar::get());
    }
  }
?>