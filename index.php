<?php require('includes/config.php');



$servername = "localhost";
$username = "nicatos1";
$password = "123456789";
$dbname = "myfirstgame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

require_once "Class_for_excel/PHPExcel.php";
include 'PHPExcel/IOFactory.php';



//process login form if submitted
if(isset($_POST['submit'])){
    $main_dir='member_dir/';
	
	//$username = $_POST['username']; this is for real one
	$username='ozden';
	
	$sql = "SELECT username FROM members";
    $result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		
		if($username==$row['username']){
			//choosing the proper directory
        
     		
		
	     	$second_dir=$main_dir.$username;
	    	
		
		
		    //openin proper directory
      
            opendir($second_dir);
            if ($handle = opendir($second_dir)){
             while (false !== ($file = readdir($handle))){
				 if ($file != "." && $file != "..")
				 {     
	               
	               $filename_array=explode(".",$file);
				   //$filename=$_POST['filename']; this is for real one
		           $filename='default';
		            if($filename_array[0]==$filename){
				      //choosing the proper file

				      $file_dir=$second_dir.'/'.$file;
				      
					  
					  
					  							 
	                  //  Read your Excel workbook====================================================================
	                 $inputFileName=$file_dir;
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
					  
					  
						$first_part=$list1[0][0];
						
											
                       
                        //the array are getted==================================================================
						
						
						$id_list=array('id','Id','ID','iD');
				
						foreach($first_part as $names){
							foreach($id_list as $id_types){
								if($id_types==$names){
									$key = array_search($names, $first_part);
							         for($x=0;$x<=count($list1);$x++){
								          if($_POST['student_id']==$list1[$x][0][$key]){
										   
								           //creating table
										   //creating header
										   
										   //this if for real one
										   //$show='</br><br/></br><p> Teacher : '.$username.'</p> </br> <p> Course name: '.$filename_array[0].'</p></br><table style="border: 1px solid black;"><tr style="border: 1px solid black;">';
										   $show='<br><br><hr><div style="overflow:auto;"><table style="border: 1px solid black;" table-layout:fixed; width:100%; style="width: 100%; background: grey; color: white;" ><tr style="border: 1px solid black;" >';
										   for($el=0;$el<=count($first_part);$el++){
											   
											   $show.='<th style="border: 1px solid black; background:#e6eeff; width:100%; " >'.$first_part[$el].'</th>';
										   }
										   
										   $show.='</tr><tr style="border: 1px solid black;">';
										   //creating elements
										   for($el=0;$el<=count($list1[$x][0]);$el++){
											   
											   $show.='<td style="border: 1px solid black; background:#e6ffff; width:100%;"> '.$list1[$x][0][$el].'</td>';
										   }
										   $show.='</tr></table></div><hr>';
										   
										   
										   
										   //end of table

								
								                                                }
							                                                   }
															  
								
								
								
								}
							}
						}

						
					
						
                          					            }
                                                       }
                                                     }
                             closedir($handle);
                              }//finising choosing the proper file
  							  
        

		}
    }//finishing choosing the proper directoryu

} 
else {
    echo "<h3> There is no username in database </h3>";
}
$conn->close();

}//end if submit





	
	
		
	



//define page title
$title = 'Student info';

//include header template
require('layout/header.php');
?>
<style>

</style>
<div class="container">

	<div class="row">

	    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
		
		
		    
			<form role="form" method="post" action="" autocomplete="off">
				<hr>
				<h2>Learn your grades...</h2>
				<p><a href='login.php'>Login</a></p>
				<hr>

				<?php
				//check for any errors
				if(isset($error)){
					foreach($error as $error){
						echo '<p class="bg-danger">'.$error.'</p>';
					}
				}

				//if action is joined show sucess
				if(isset($_GET['action']) && $_GET['action'] == 'joined'){
					echo "<h2 class='bg-success'>Registration successful, please check your email to activate your account.</h2>";
				}
				?>
				
			     
				<!--this is for real one-->
				<!--<div class="form-group">
					<input type="text" name="username" id="username" class="form-control input-lg" placeholder="Teachers nickname" value="<?php if(isset($error)){ echo $_POST['username']; } ?>" tabindex="1">
				</div>
				<div class="form-group">
					<input type="filename" name="filename" id="filename" class="form-control input-lg" placeholder="Filename" value="<?php if(isset($error)){ echo $_POST['filename']; } ?>" tabindex="2">
				</div>-->
				
				<div class="form-group">
					<input type="student_id" name="student_id" id="student_id" class="form-control input-lg" placeholder="Your student Id" value="<?php if(isset($error)){ echo $_POST['student_id']; } ?>" tabindex="2">
				</div>

				<div class="row">
					<div class="col-xs-6 col-md-6"><input type="submit" name="submit" value="Go" class="btn btn-primary btn-block btn-lg" tabindex="5"></div>
					<h4> <?php echo $show ?></h4> 
				</div>
				
				
			</form>
		</div>
	</div>

</div>

<?php
//include header template
require('layout/footer.php');
?>
