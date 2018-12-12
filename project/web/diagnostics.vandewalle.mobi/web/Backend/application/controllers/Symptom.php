<?php
class Symptom extends CI_Controller {

        public function index()
        {
                echo 'Symptom api!';
        }

        public function get_symptomsFromSearch($search){
                //$this->load->model('Symptom_model');
                //$symptoms = $this->Symptom_model->get_symptomsFromSearch($search); 

                // dummy data
                $symptoms = "[{ \"symptom\": \"backache\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000006\"},{ \"symptom\": \"joint pain\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000064\"},{ \"symptom\": \"fever\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000613\"},{ \"symptom\": \"body ache\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000230\"},{ \"symptom\": \"slight cough\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000137\"},{ \"symptom\": \"body ache\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000230\"},{ \"symptom\": \"aggressive behavior\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000681\"}]";
                //$symptoms = "[{ 'symptom': 'backache_local1', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000006'},{ 'symptom': 'joint pain_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000064'},{ 'symptom': 'fever_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000613'},{ 'symptom': 'body ache_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000230'},{ 'symptom': 'slight cough_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000137'}]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 

                //echo "[" . json_encode($symptoms) . "]";
                //echo json_encode($symptoms);
                echo $symptoms;
        }

        public function get_symptomsAlternatives($symptom){
                // returns: een lijst van symptomen op basis van $symptom
                // de hoofd- en subclasses van $symptom

                // wil je de naam van symptom (bv pain)
                // of de uri (bv http://purl.obolibrary.org/obo/SYMP_0000006)

                //$this->load->model('Symptom_model');
                //$symptoms = $this->Symptom_model->get_symptomsFromSearch($search); 

                // dummy data
                $symptoms = "[{ \"symptom\": \"pain\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000006\"},{ \"symptom\": \"mild pain\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000064\"},{ \"symptom\": \"severe pain\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000613\"},{ \"symptom\": \"body ache\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000230\"},{ \"symptom\": \"head ache\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000137\"},{ \"symptom\": \"head ache front\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000230\"},{ \"symptom\": \"aggressive pain\", \"uri\": \"http://purl.obolibrary.org/obo/SYMP_0000681\"}]";
                //$symptoms = "[{ 'symptom': 'backache_local1', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000006'},{ 'symptom': 'joint pain_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000064'},{ 'symptom': 'fever_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000613'},{ 'symptom': 'body ache_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000230'},{ 'symptom': 'slight cough_local', 'uri': 'http://purl.obolibrary.org/obo/SYMP_0000137'}]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 

                //echo "[" . json_encode($symptoms) . "]";
                //echo json_encode($symptoms);
                echo $symptoms;
        }

        public function save_patientSymptom($symptom, $uri, $severity, $startedDate, $endedDate, $lattitude, $longitude, $bodypart){
                $data = array(
                        'title' => 'My title',
                        'name' => 'My Name',
                        'date' => 'My date'
                );
                
                $this->db->insert('mytable', $data);

                /*
                Uri_bodypart
                Uri_symptom	
                Birthcountry
                Birthplace
                Last name
                Middle names
                First name
                Date of Birth
                Latitude
                Longitude
                Stop Time
                Start Time
                Severity
                */


                /*
                symptom
                uri
                element.severity = 0;
                element.startedDate = myDate;
                element.endedDate = myDate;

                element.lattitude = 51;
                element.longitude = 3.2;

                */
        }
}