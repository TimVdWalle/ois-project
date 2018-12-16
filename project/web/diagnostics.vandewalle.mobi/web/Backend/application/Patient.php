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

                // db laden
                $this->load->database();

                // binnenkomende request omzetten naar variables
                $entityBody = file_get_contents('php://input');
                $data = json_decode($entityBody);
                $rf = $data->riskFactors;
                
                $this->db->db_debug = false;
                try {                                
                        // saven van patient data - PATIENT
                        $dataPatient = array(
                                'FirstName' => $data->firstName,
                                'MiddleNames' => $data->middleNames,
                                'LastName' => $data->lastName,
                                'Birthplace' => $data->birthplace,
                                'Birthcountry' => $data->birthCountry,
                                'DateOfBirth' => $data->dateOfBirth,
                                'Sex' => $data->sex
                        );

                        // saven van patient data - ProvidesInfoAbout / ProvidesInfoAboutPatient
                        $dataPatientProvides = array(
                                'FirstName' => $data->firstName,
                                'MiddleNames' => $data->middleNames,
                                'LastName' => $data->lastName,
                                'Birthplace' => $data->birthplace,
                                'Birthcountry' => $data->birthCountry,
                                'DateOfBirth' => $data->dateOfBirth,

                                'Username' => $data->userName
                        );

                        if(isset($data->isMedicalProfessional) && $data->isMedicalProfessional === true){
                                // saven als medical professional
                                $this->db->insert('ProvidesInfoAboutPatient', $dataPatientProvides);
                        } else {
                                // saven als gewone gebruiker
                                $this->db->insert('ProvidesInfoAbout', $dataPatientProvides);
                        }

                        // saven naar patient table
                        $this->db->insert('Patient', $dataPatient);

                        // saven van riskfactors
                        /*
                        // leegmaken van riskfactors (voorlopig nog niet nodig)
                        $query = $this->db->query("SELECT Name from RiskFactor");
                        $this->db->delete('mytable', array('id' => $id));
                        */

                        foreach ($rf as $key => $value) {
                                //echo "saving $value->Name   <br />";
        
                                $dataRiskFactor = array(
                                        'FirstName' => $data->firstName,
                                        'MiddleNames' => $data->middleNames,
                                        'LastName' => $data->lastName,
                                        'Birthplace' => $data->birthplace,
                                        'Birthcountry' => $data->birthCountry,
                                        'DateOfBirth' => $data->dateOfBirth,
                
                                        'Severity' => $value->severity,
                                        'StartTime' => $value->startTime,
                                        'StopTime' => $value->stopTime,
                                        'Longitude' => $value->longitude,
                                        'Latitude' => $value->latitude,
                                        'Name' => $value->Name,
                                );

                                $this->db->insert('PatientRiskFactor', $dataRiskFactor);
                        }

                        echo("Patient has been registered.");
                } catch (Exception $e) {
                        echo 'Caught exception: ',  $e->getMessage(), "\n";    
                }
        }

        public function save_patientSymptoms(){
                header('Access-Control-Allow-Origin: *');
                header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
                header('Access-Control-Allow-Credentials: true');

                // db laden
                $this->load->database();

                // binnenkomende request omzetten naar variables
                $entityBody = file_get_contents('php://input');
                $data = json_decode($entityBody);
                $symptoms = $data->symptoms;

                //var_dump($data);
                $this->db->db_debug = false;

                try {              
                        foreach ($symptoms as $key => $value) {
                                $dataRiskFactor = array(
                                        'FirstName' => $data->firstName,
                                        'MiddleNames' => $data->middleNames,
                                        'LastName' => $data->lastName,
                                        'Birthplace' => $data->birthplace,
                                        'Birthcountry' => $data->birthCountry,
                                        'DateOfBirth' => $data->dateOfBirth,
                
                                        'Severity' => $value->severity,
                                        'StartTime' => $value->startTime,
                                        'StopTime' => $value->stopTime,
                                        'Longitude' => $value->longitude,
                                        'Latitude' => $value->latitude,
                                        
                                        'Symptom' => $value->symptom,
                                        'Uri_symptom' => $value->uri,
                                        'Uri_bodypart' => $value->Uri_bodypart
                                );

                                $this->db->insert('PatientSymptom', $dataRiskFactor);
                        }

                        echo("Symptoms have been registered.");
                } catch (Exception $e) {
                        echo 'Caught exception: ',  $e->getMessage(), "\n";    
                }
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