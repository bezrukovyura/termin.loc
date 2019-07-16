<? 
ini_set("display_errors", 1);
error_reporting(E_ALL);

require_once "calendar.php";
  
if ( isset($_POST['dates']) )
{
  var_dump( Calendar::save($_POST['dates'], date('Y')) );
}

?>