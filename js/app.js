$data_user = __({
  url:'./index.php/user/api_view_user'
});

let app_template ;
const component_app = $profile.getHtml;

function loadData(type=false)
{
	$data_user.request($response=>{
		var obj = JSON.parse($response);
		
		if (obj){
			var user = obj.user;

			var data = new Array();

			for (var i = 0; i < user.length; i++) 
			{
				data[i] = {
					id_user  : user[i].id,
					name     : user[i].name,
					email    : user[i].email,
					address  : user[i].address,
					phone   : user[i].phone,
					object_data: [ " name:'"+user[i].id+"'", " email:'"+user[i].email+"'", " address:'"+user[i].address+"' " ]
				}
			}

			if (type)
			{
				$profile.setContent({
					multi:data
				});

				$profile.show();
			}else{
				$profile.setContent(component_app);
				$profile.setContent({
					multi:data
				});

				$profile.show();
			}
		}
	});
}

loadData(true);


function showTemplateAdd()
{
	app_template = $app.getContent;

	$app.setContent('<div id="msg-show"></div><input type="text" class="form-control" id="txt_name" onkeypress="enterAdd(event);" placeholder="Username" name=""> <br>'+
					'<input type="email" onkeypress="enterAdd(event);" class="form-control" id="txt_email" placeholder="Email" name=""><br>'+
					'<input type="text" onkeypress="enterAdd(event);" class="form-control" id="txt_address" placeholder="Address" name=""><br>'+
					'<input type="text" onkeypress="enterAdd(event);" class="form-control" id="txt_phone" placeholder="Phone" name=""><br>'+
					'<button class="btn btn-success btn-md" onclick="addData();">Add</button>&nbsp'+
					'<button class="btn btn-danger btn-md" onclick="cancel();">Cancel</button>'
	);

	Garuda('txt_name').focus();
}

function cancel()
{
	Garuda('my_app').setContent(app_template);
	loadData();
}

function enterAdd(e)
{
	if (e.keyCode==13)
	{
		addData();
	}
}

function addData()
{
	 let name = Garuda('txt_name').getValue;
	 let email = Garuda('txt_email').getValue;
	 let address = Garuda('txt_address').getValue;
	 let phone = Garuda('txt_phone').getValue;

	 if (name==='' || name==null || name===undefined)
	 {
	 	 Garuda('txt_name').focus();
	 	 return;
	 }

	 if (email==='' || email==null || email===undefined)
	 {
	 	 Garuda('txt_email').focus();
	 	 return;
	 }

	 if (_isEmail(email)==false)
	 {
	 	Garuda('msg-show').setContent(displayAlert('Email is not valid !','warning'));
	 	 Garuda('txt_email').focus();
	 	return;
	 }

	 if (address==='' || address==null || address===undefined)
	 {
	 	 Garuda('txt_address').focus();
	 	 return;
	 }

	  if (phone==='' || phone==null || phone===undefined)
	 {
	 	 Garuda('txt_phone').focus();
	 	 return;
	 }

	 
	 $insert_data = __({
	    url:'./index.php/user/api_add_user',
	    method:'post',
	    data:{
	      name:name,
	      email:email,
	      address:address,
	      phone:phone
	    }
	 });

	 $insert_data.request($=>{
	 	  if ($==='T')
	 	  {
	 	  	 Garuda('msg-show').setContent(displayAlert('Data has been added !','success'));
	 	  	 Garuda('txt_name').clearValue();
	 	  	 Garuda('txt_email').clearValue();
	 	  	 Garuda('txt_address').clearValue();
	 	  	 Garuda('txt_phone').clearValue();
	 	  	 Garuda('txt_name').focus();
	 	  }else{
	 	  	 Garuda('msg-show').setContent(displayAlert('Failed to add data !','warning'));
	 	  }
	 });
}

function displayAlert(message,type)
{
	return '<div class="alert alert-'+type+'" role="alert">'+message+'</div>'; 
}

function viewUpdateData(obj)
{
	app_template = $app.getContent;

	var id   =  obj.id;

	$app.setContent('<div id="msg-show"></div><input type="number" onkeypress="enterUpdate(event);" class="form-control" readonly="" id="txt_id_update" placeholder="ID" value="'+id+'" > <br>'+
					'<input type="text" onkeypress="enterUpdate(event);" class="form-control" id="txt_name_update" placeholder="Name" value=""><br>'+
					'<input type="email" onkeypress="enterUpdate(event);" class="form-control" id="txt_email_update" placeholder="Email" value=""><br>'+
					'<input type="text" onkeypress="enterUpdate(event);" class="form-control" id="txt_address_update" placeholder="Address" value="" ><br>'+
					'<input type="text" onkeypress="enterUpdate(event);" class="form-control" id="txt_phone_update" placeholder="Phone" value="" ><br>'+
					'<button id="btn_update" class="btn btn-success btn-md" disabled="" onclick="updateData();">Please Wait...</button>&nbsp'+
					'<button class="btn btn-danger btn-md" onclick="cancel();">Cancel</button>'
	);
	 $view_data = __({
	    url:'./index.php/user/api_view_user_single_data',
	    method:'post',
	    data:{
	      id:id
	    }
	 });

	 $view_data.request($response=>{
	 		var obj = JSON.parse($response);
			if (obj){
				Garuda('txt_name_update').setValue(obj[0].name);
				Garuda('txt_email_update').setValue(obj[0].email);
				Garuda('txt_address_update').setValue(obj[0].address);
				Garuda('txt_phone_update').setValue(obj[0].phone);
				Garuda('btn_update').setContent('Update');
				Garuda('btn_update').enabled();
			}
	 });
}

function enterUpdate(e)
{
	if (e.keyCode==13)
	{
		updateData();
	}
}

function updateData()
{
	 let id_update = Garuda('txt_id_update').getValue;
	 let name = Garuda('txt_name_update').getValue;
	 let email = Garuda('txt_email_update').getValue;
	 let address = Garuda('txt_address_update').getValue;
	 let phone = Garuda('txt_phone_update').getValue;

	 if (name==='' || name==null || name===undefined)
	 {
	 	 Garuda('txt_name_update').focus();
	 	 return;
	 }

	 if (email==='' || email==null || email===undefined)
	 {
	 	 Garuda('txt_email_update').focus();
	 	 return;
	 }

	 if (_isEmail(email)==false)
	 {
	 	Garuda('msg-show').setContent(displayAlert('Email is not valid !','warning'));
	 	 Garuda('txt_email_update').focus();
	 	return;
	 }

	 if (address==='' || address==null || address===undefined)
	 {
	 	 Garuda('txt_address_update').focus();
	 	 return;
	 }

	  if (phone==='' || phone==null || phone===undefined)
	 {
	 	 Garuda('txt_phone_update').focus();
	 	 return;
	 }
	 
	 $update_data = __({
	    url:'./index.php/user/api_update_user',
	    method:'post',
	    data:{
	      id:id_update,
	      name:name,
	      email:email,
	      address:address,
	      phone:phone
	    }
	 });

	 $update_data.request($=>{
	 	  if ($==='T')
	 	  {
	 	  	 Garuda('msg-show').setContent(displayAlert('Data has been updated !','success'));
	 	  }else{
	 	  	 Garuda('msg-show').setContent(displayAlert('Failed to updated data !','warning'));
	 	  }
	 });
}

function viewDeleteData(id)
{
	var ask = confirm("Are you sure want to delete this data ? ");

	if (ask == true) {
	    $delete_data = __({
		    url:'./index.php/user/api_delete_user',
		    method:'post',
		    data:{
		      id:id
		    }
		 });

		 $delete_data.request($=>{
		 	  if ($==='T')
		 	  {
		 	  	 Garuda('display_message').setContent(displayAlert('Data has been deleted !','success'));
		 	  	 loadData();
		 	  }else{
		 	  	 Garuda('display_message').setContent(displayAlert('Failed to deleted data !','warning'));
		 	  }
		 });
	} 
}

function enterSearch(e){
	if (e.keyCode==13)
	{
		searchUser();
	}
}

function searchUser() 
{
	 var name = Garuda('txt_search').getValue;

	 if (name==='')
	 {
	 	Garuda('txt_search').focus();
	 	return;
	 }

	$search_user = __({
	  url:'./index.php/user/api_search_user',
	  method:'post',
	  data:{
	  	 name:name
	  }
	});

	$search_user.request($response=>{
		var obj = JSON.parse($response);
		
		if (obj)
		{
			var user = obj.user;

			if (user.length==0)
			{
				Garuda('display_message').setContent(displayAlert('Data {'+name+'} not found !','warning'));
				return;
			}else{
				var data = new Array();
				var count_data = 1;
				for (var i = 0; i < user.length; i++) 
				{
					data[i] = {
						id_user  : user[i].id,
						name     : user[i].name,
						email    : user[i].email,
						address  : user[i].address,
						phone   : user[i].phone,
						object_data: [ " name:'"+user[i].id+"'", " email:'"+user[i].email+"'", " address:'"+user[i].address+"' " ]
					}
					count_data++;
				}

				$profile.setContent(component_app);
				$profile.setContent({
					multi:data
				});

				$profile.show();
				Garuda('display_message').setContent(displayAlert('Count Data {'+count_data+'} !','success'));
			}

		}
	});
}