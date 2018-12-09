<?php
class Patient extends CI_Controller {

        public function index()
        {
                echo 'Patient api!';
        }

        public function get_patientsForUser($user){
            $this->load->model('Patient_model');
            $patients = $this->Patient_model->get_patientsForUser($user); 

            //add the JSON header here
             header('Content-Type: application/json');
             header('Access-Control-Allow-Origin: *'); 
             
             echo json_encode($patients);
        }
}