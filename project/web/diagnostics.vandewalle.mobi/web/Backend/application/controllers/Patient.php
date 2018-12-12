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

        public function save_patient(){
                header('Access-Control-Allow-Origin: *');
                header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
                header('Access-Control-Allow-Credentials: true');

                // binnenkomende request omzetten naar variables
                $entityBody = file_get_contents('php://input');
                $data = json_decode($entityBody);

                //var_dump($entityBody);

                $firstName = "";
                $middleNames = "";
                $lastName = "";
                $birthplace = "";
                $birthCountry = "";
                $dateOfBirth = "";

                $data = array(
                        'FirstName' => $data->firstName.$data->userName,
                        'MiddleNames' => $data->middleNames,
                        'LastName' => $data->lastName,
                        'Birthplace' => $data->birthplace,
                        'Birthcountry' => $data->birthCountry,
                        'DateOfBirth' => $data->dateOfBirth,
                        'Sex' => $data->sex
                );
                
                try {
                        $this->load->database();
                        $this->db->insert('Patient', $data);
                        echo("Patient has been registered.");
                } catch (Exception $e) {
                        echo 'Caught exception: ',  $e->getMessage(), "\n";    
                }


                // TODO : nog inserten in tabel om koppeling te maken met user

                //echo "ok from server" .$firstName + " " + $dateOfBirth;
                //echo "ok from server" . "j";
                

        }
}

/*      

INSERT INTO `Patient`(, , , , , , `Sex`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7])


>INSERT INTO `Patient` (`First` `name`, `Middle` `names`, `Last` `name`, `Birthplace`, `Birthcountry`, `Date of` `Birth`, ) VALUES ('', '', '', '', '', '', 'M')

Birthcountry
Birthplace
Last name
Middle names
First name
Date of Birth



firstName: this.firstName, 
middleNames: this.middleNames, 
lastName: this.lastName, 
birthplace: this.birthplace, 
birthCountry: this.birthCountry, 
dateOfBirth: this.dateOfBirth

*/

/*
$firstName,
$middleNames,
$lastName,
$birthplace,
$birthCountry,
$dateOfBirth)
*/