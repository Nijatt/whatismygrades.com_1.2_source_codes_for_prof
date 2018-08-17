<?php require('includes/config.php'); 

if(!$user->is_logged_in()){ header('Location: login.php'); } 


$title = 'Members Page';


require('layout/header.php'); 
?>

<div class="container">

	<div class="row">

	    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
			
				<h2> Welcome , let's start play ... <?php echo $_SESSION['username']; ?></h2>
				<p><a href='logout.php'>Logout</a></p>
				<hr>

		</div>
	</div>


</div>

<?php 

require('layout/footer.php'); 
?>
