<?php require('includes/config.php'); 

//if not logged in redirect to login page
if(!$user->is_logged_in()){ header('Location: login.php'); } 



//Creating directory

  $main_dir="member_dir/"; //main directory where all users open directory inside
  //getting directory name
  $directory_n= $main_dir.$_SESSION['username']; //the excel files will be saved here
  
  //creating directory
 if (!file_exists($directory_n)) {
    mkdir($directory_n, 0777, true);
}
 // mkdir($directory_n); // getting directory and opening it



//****************************************************************************
//when u upload a file and send it to server
if(isset($_POST['send'])){
	$target_dir = $directory_n."/";
	$target_file = $target_dir . basename($_FILES["filepath"]["name"]);
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	move_uploaded_file($_FILES["filepath"]["tmp_name"], $target_file);
	
	echo "The uploaded file is: ".$target_file;
}

//when u choose a file and read it from server 
$inputFileName = "TEST1.xls";

if(isset($_POST['read'])){
//read excell  

require_once "Class_for_excel/PHPExcel.php";
include 'PHPExcel/IOFactory.php';


$inputFileName = "TEST2.xls";




if(isset($_POST['hidden_p_n_1']))
{    
	$adress = $_POST['hidden_p_n_1'];
	$inputFileName=$adress;	
	echo "The choosen file is : ".$inputFileName;
	echo '<button onclick="getReady()" >START</button> <form action="member_page.php" method="POST">
	                                                   <input name="hidden_name" style="display:none" value="'.$inputFileName.'">
													   <button name="rem_file">REMOVE</button>
													   </form>';
	
}



	
	
//  Read your Excel workbook
try {
    $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
    $objPHPExcel = $objReader->load($inputFileName);
} catch(Exception $e) {
    die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
}

//  Get worksheet dimensions
$sheet = $objPHPExcel->getSheet(0); 
$highestRow = $sheet->getHighestRow(); 
$highestColumn = $sheet->getHighestColumn();

$list1=array();

//  Loop through each row of the worksheet in turn
for ($row = 1; $row <= $highestRow; $row++){ 
    //  Read a row of data into an array
    $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
                                    NULL,
                                    TRUE,
                                    FALSE);
    //  Insert row data array into database here using your own structure
	$list1[]=$rowData;
}

}
// php command for file deleting
if(isset($_POST['rem_file']))
{
	
	$deleted_name=$_POST['hidden_name'];
    unlink($deleted_name);
	echo $deleted_name." file is deleted..";
}

//when u write file name and create xls file to server
if(isset($_POST['create'])){

$list2=array();	

if(isset($_POST['hidden_p_n']))
{
	$MAIN_DATA = $_POST['hidden_p_n'];
	$firstDim=explode("#",$MAIN_DATA);
	foreach(range(0, count($firstDim)) as $i) 
	{
		$secondDim=explode("*",$firstDim[$i]);
		$list2[] = $secondDim;
		}	
		}

if(strlen($_POST['username']) < 3)
{
	$error[] = 'Username is too short.';
} 
else 
{
	$stmt = $db->prepare('SELECT username FROM members WHERE username = :username');
	$stmt->execute(array(':username' => $_POST['username']));
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
	if(!empty($row['username']))
	{
	    $error[] = 'Username provided is already in use.';
	}

}

//getting file name
if(strlen($_POST['file_namee']) < 3)
{
	echo "error1: filename too short";	
}
else
{
	
	$file_n=$_POST['file_namee'];
	//creating file inside the created directory  
    $fp1=fopen($directory_n."/".$file_n.".xls","w");
    //$fp2=fopen($directory_n."/".$file_n.".csv","w");

    foreach($list2 as $field)
    {
		fputcsv($fp1, $field);
		//fputcsv($fp2, $field);
	}	
}
}
 




?>


<!DOCTYPE html>
<html lang="en">
<head>
   <canvas id="ctx" ></canvas>
    <title>Generate Table</title>
    <meta charset="utf-8">

   <link rel="stylesheet" href="style/main.css">
	<script src="json_store_script.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
<script type="text/javascript">
var data2=[12, 19, 3, 5, 2, 3];
// this is for create activity
function getArray(){
	var array=[]
	array=<?php echo json_encode($list1); ?>;
	return array;
	}
	

function getReady(){
	var array1=getArray();
	MAIN_ARRAY=[];
	
	for (var i=0;i<array1.length;i++){
         
        var str=array1[i].toString();
        
		var secondDim=[]
        secondDim=str.split(",");		
		MAIN_ARRAY.push(secondDim);		
	}
	
	
	
	open(MAIN_ARRAY)
	//createTable(MAIN_ARRAY);
	createTable(MAIN_ARRAY);
	createTable_1(MAIN_ARRAY);
	from_array_to_screen(MAIN_ARRAY);
	
	
}

function for_button(file_name){
	var str="null string";
	str=file_name;
	var hidden_place=document.getElementById("hidden_p_1");
	hidden_place.value=str;
	getReady();
}

function delete_file(){
	var name;
	name=<?php echo json_encode($inputFileName); ?>;
	alert(name);
	
	$.ajax({
                type: "POST",
                url: "member_page.php",
                data: {"imagefile":name},                        
                success: function(response) {
                alert("File:"+name+" succsessfully deleted");
                }
        }); 
	
	
}
</script>
<link type="text/css" rel="stylesheet" href="stylesheet_for.css">
</head>
<body>

<div class="container">

	<div class="row">

	    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
			
				<h2> Welcome ,<?php echo $_SESSION['username']; ?> <br/> let's start ... </h2>
				<p><a href='logout.php'>Logout</a></p>
				<hr>

		</div>
	</div>


</div>

  <div id="data_save" class="save_class"  
	 onmouseover="document.getElementById('total_form').style.display = 'block';" 
     onmouseout="document.getElementById('total_form').style.display = 'none';">
	 
    SAVE
	<div id="total_form" style="display:none;"> 
	
	<form method="post" action="member_page.php">
	
    <input id="hidden_p" name="hidden_p_n" style="display:none">
	
	<h6> The data will be saved as excel and csv file in server directory.. </h6>
    <input type="text" id="file_name_id" name="file_namee" placeholder=" Type here file name to save.."><br/>
    <button  name="create"  id="save_file" onclick="myMethod()">Save</button>
	</form>
	
    <h6> The data will be saved in local storege.. </h6>
    <input type="text" id="local_storage_name"  placeholder=" Type here name to save..">
    <button onclick="save_to_localStorage()"> Save </button>
    <button onclick="load_from_localStorage()"> Load </button>
	<button onclick="getReady()">show</button>
	
    </div>	
 </div>
 
 
 
 
<div id="graph_show" class="graph_class" 
     onmouseover="document.getElementById('graph_id').style.display = 'block';" 
     onmouseout="document.getElementById('graph_id').style.display = 'none';"
	>
Histograms
<div class="graphshow_class" id="graph_id" style="display:none;">

    <div id='d1' style="position:absolute; top:10px; left:10px; z-index:1">
    <canvas id="histogram_chart" height="300px" width="300px" ></canvas>
	<div id="histogram_button_div"  style="position:absolute;
                                         	top:0px; left:320px; height:300px;
	                                         width:100px; overflow:auto; z-index:1">
 
	<button onclick="generate_button_for_hist()">generate buttons</button>
    </div>	
	</div>
	
	
	
	<div id='d2' style="position:absolute; top:10px; left:570px; z-index:1">
    <canvas id="histogram_chart2" height="300px" width="300px" style="position:absolute;
                                                                     	top:0px; left:120px; "></canvas>
	<div id="histogram_button_div2"  style="position:absolute;
                                         	top:0px; left:0px; height:300px;
	                                         width:100px; overflow:auto; z-index:1">
											 
    <button onclick="generate_button_for_hist()">generate buttons</button>
	
    </div>	
	</div>
	
</div>
	<script src="graph_work.js"></script>
</div>

 
 
 <div id="data_change" class="change_class" onmouseover="document.getElementById('table_id1').style.display = 'block';" 
     onmouseout="document.getElementById('table_id1').style.display = 'none';">
<input id="curve_id" placeholder="CURVE: null" style="width:100px"> 
<input id="std_id" placeholder="STD: null" style="width:80px">
<button onclick="change_data()">Change</button>
<button onclick="alert_commands()">Commands?</button>

<br/>
<hr/>
<input id="ff_id" placeholder="FF: null" style="width:60px"> 
<input id="fd_id" placeholder="FD: null" style="width:60px">  
<input id="dd_id" placeholder="DD: null" style="width:60px"> 
<input id="dc_id" placeholder="DC: null" style="width:60px">
<input id="cc_id" placeholder="CC: null" style="width:60px"> 
<input id="cb_id" placeholder="CB: null" style="width:60px">
<input id="bb_id" placeholder="BB: null" style="width:60px"> 
<input id="ba_id" placeholder="BA: null" style="width:60px">
<input id="aa_id" placeholder="AA: null" style="width:60px"> 
<hr/>     
<table class="table_class1" id="table_id1" style="display:none;">
    </table>
</div>

 
 
 
 
 
<div id="data_show" class="show_class" onmouseover="document.getElementById('table_id').style.display = 'block';" 
     onmouseout="document.getElementById('table_id').style.display = 'none';">
Table
<table class="table_class" id="table_id" style="display:none;">
        
    </table>
</div>
 
 
 
 
<div id="file_show" class="file_class" onmouseover="document.getElementById('files_id').style.display = 'block';" 
     onmouseout="document.getElementById('files_id').style.display = 'none';">
Files

<div class="files_class" id="files_id" style="display:none;">
    <form action="member_page.php" method="post" enctype="multipart/form-data">
    <div id="drop" style="display:none;">Drop a spreadsheet file here to see sheet data</div>

    <input type="file"  name="filepath" id="filepath"/></td><td><input type="submit" name="send"/>
    </form>
   
   <?php
     echo $directory_n;
     opendir($directory_n);
     if ($handle = opendir($directory_n)){
       while (false !== ($file = readdir($handle)))
      {
          if ($file != "." && $file != "..")
	  {     
            $filedir=$directory_n."/".$file;
			$for_func="'".$filedir."'";
          	$thelist .= '<a href="/'.$filedir.'">'.$file.'</a>'.'<br/>';
			//$thelist2.='<button name="read" onclick="for_button('.$filedir.')">'.$file.'</button> <br/>';
		    $thelist2.='<button name="read" onclick="for_button('.$for_func.')">'.$file.'</button> <br/>';
          }
       }
  closedir($handle);
  } 
   ?>
   
   <form method="POST" action="member_page.php">
   
   <input id="hidden_p_1" name="hidden_p_n_1" style="display:none">
   <P><?=$thelist2?></p>

   </form>
   
    </div>
</div>
 
 
</BR>


</BR>
 
 
 

</br>
<input type="text" id="header" style="width:300px;" placeholder=" Name Surname Id MT1 MT2 Final ..." >
<button onclick="on_generate()"> Generate </button>
<button onclick="on_extend()">Extend </button>


</br>
</BR>

<form style="display:none;" id="entries"> 
</form>

<button onclick="store_data()" id="store_button" style="display:none;"> Add </button>


</body>
</html>

