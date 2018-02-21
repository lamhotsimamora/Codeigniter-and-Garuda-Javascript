<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>User Profile</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	<script type="text/javascript" src="https://www.cdn.lamhotsimamora.com/garuda2/"></script>
	<meta name="og:image" 			content="" />
	<meta property="og:image"     	content="" />
	<link rel="shortcut icon" type="image/png" href="icon.png"/>
	<meta name="ROBOTS" 			content="index"/>
	<meta name="Author" 			content="@lamhotsimamora" />
	<meta name="copyright" 			content="Copyright@2018 | All Right Reserved" />
	<meta property="og:title" 		content="" />
	<meta property="og:description" content="" />
	<meta property="og:name"      	content="" />
	<meta name="language" 		  	content="Indonesian, English" />
	<meta name="distribution" 	  	content="Global" />
	<meta name="rating" 		  	content="General" />
	<meta name="expires" 		  	content="1800" />
	<meta name="theme-color"      	content="#E43539"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body id="garuda_app">
	<br><br>
	
	<div class="container">
		<center class="jumbotron">
			<h3>Codeigniter & Garuda Javascript 2</h3>
		</center>
		<br>
		<button class="btn btn-info btn-md" onclick="_scrollTo({x:999999999999999,y:999999999999999});">Go Down</button>
		<br><br>
		<hr>
	</div>

	<div id="my_app" class="container">
		
		<div id="display_message"> </div>
		<button class="btn btn-default btn-md" onclick="showTemplateAdd();">Add Data</button> &nbsp
		<button class="btn btn-success btn-md" onclick="loadData();">Refresh</button> <br>
		<br>
		<input type="text" id="txt_search" onkeypress="enterSearch(event);" placeholder="Search User" class="form-control" name="">
		<hr>
		<br>
		<div id="template-profile" style="display: none">
			
				@start@
						<div class="card">
						  <h5 class="card-header">#name#</h5>
						  <div class="card-body">
						    <h5 class="card-title">#email#</h5>
						    <p class="card-text">#address#</p>
						    <a class="btn btn-secondary btn-md">#phone#</a>
						    <center>
						    	<button class="btn btn-warning btn-xs" id="#id_user#" onclick="viewUpdateData(this)">Update</button>
						    	<button class="btn btn-danger btn-xs" id="#id_user#" onclick="viewDeleteData(this.id);">Delete</button>
						    </center>
						  </div>
						</div>
						<br>
				@end@
		</div>

	</div>


	<div id="body_down">
		
	</div>
	<div class="container">
			<footer>
				 <br>
				 <hr>
				<button class="btn btn-info btn-md" onclick="_scrollTo({el:'garuda_app'});">Go Up</button>
			</footer>
	</div>
</body>

<script type="text/javascript" src="<?php echo base_url('js/component.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('js/app.js') ?>"></script>

</html>