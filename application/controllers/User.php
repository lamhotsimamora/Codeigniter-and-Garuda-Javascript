<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('Model_User');
	}
	public function index()
	{
		$this->load->view('index');
	}

	public function api_view_user()
	{
		$data['user'] = $this->Model_User->getData();

		echo json_encode($data);
	}

	public function api_add_user()
	{
		if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['phone']))
		{
			$data['name']        = addslashes(trim($_POST['name'])); 
			$data['email']       = addslashes(trim($_POST['email'])); 
			$data['address']     = addslashes(trim($_POST['address'])); 
			$data['phone']     = addslashes(trim($_POST['phone'])); 

			if ($data['name']=='' || $data['email']=='' || $data['address']=='' || $data['phone']=='')
			{
				echo "F";
				exit;
			}

			$result = $this->Model_User->addData($data);

			if ($result)
			{
				echo "T";
			}else{
				echo "F";
			}

		}else{
			echo "F1";
		}
	}

	public function api_update_user()
	{
		if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['phone']) && isset($_POST['id']))
		{
			$id         = addslashes(trim($_POST['id'])); 
			$name       = addslashes(trim($_POST['name'])); 
			$email      = addslashes(trim($_POST['email'])); 
			$address    = addslashes(trim($_POST['address'])); 
			$phone    = addslashes(trim($_POST['phone'])); 

			if ($name=='' || $email=='' || $address=='' || $id=='' || $phone=='')
			{
				echo "F";
				exit;
			}

			$id     = (int) $id;

			$result = $this->Model_User->updateData($id,$name,$email,$address,$phone);

			if ($result)
			{
				echo "T";
			}else{
				echo "F";
			}

		}else{
			echo "F1";
		}
	}

	public function api_delete_user()
	{
		if (isset($_POST['id']))
		{
			$id         = addslashes(trim($_POST['id'])); 

			if ($id=='')
			{
				echo "F";
				exit;
			}

			$id     = (int) $id;

			$result = $this->Model_User->deleteData($id);

			if ($result)
			{
				echo "T";
			}else{
				echo "F";
			}

		}else{
			echo "F1";
		}
	}

	public function api_search_user()
	{
		if (isset($_POST['name']))
		{
			$name         = addslashes(trim($_POST['name'])); 

			if ($name=='')
			{
				echo "F";
				exit;
			}

			$data['user'] = $this->Model_User->searchUser($name);

			echo json_encode($data);

		}else{
			echo "F1";
		}
	}

	public function api_view_user_single_data()
	{
		if (isset($_POST['id']))
		{
			$id         = addslashes(trim($_POST['id'])); 

			if ($id=='')
			{
				echo "F";
				exit;
			}

			
			$id     = (int) $id;


			echo json_encode($this->Model_User->getDataById($id));

		}else{
			echo "F1";
		}
	}
}
