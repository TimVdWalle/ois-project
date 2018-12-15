<?php
class RiskFactor extends CI_Controller {

        //  http://diagnostics.vandewalle.mobi/Backend/Disease/

        public function index()
        {
                echo 'RiskFactor api!';
        }

        public function get($searchString) {
                echo "trying sparqlendpoint for: " . $searchString;
        }

        public function getAll() {
            $this->load->database(); 
            $query = $this->db->query("SELECT Name from RiskFactor");

            $riskFactors =  $query->result();
            //$res $query->row_array();

            //var_dump($riskFactors);

            //add the JSON header here
             header('Content-Type: application/json');
             header('Access-Control-Allow-Origin: *'); 
             
             echo json_encode($riskFactors);
        }

        private function safe_JSON($json) {
            if(strlen($json) < 3) {
                return "[]";
            }
            return $json;
        }




        
}

        