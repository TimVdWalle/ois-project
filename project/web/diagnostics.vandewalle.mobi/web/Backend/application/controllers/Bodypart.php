<?php
class Bodypart extends CI_Controller {

    public function index()
    {
            echo 'Bodypart api!';
    }

    public function get($searchString) {
            echo "trying sparqlendpoint for: " . $searchString;
    }

    public function get_bodyparts($searchString) {
            // dummy
            $diseases = "[
                    { \"bodypart\": \"body\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0013702\"},
                    { \"bodypart\": \"head\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0000033\"},
                    { \"bodypart\": \"shoulder\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0001467\"},
                    { \"bodypart\": \"knee\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0013702\"},
                    { \"bodypart\": \"toe\", \"uri\": \"http://.../DOID_4931\"}
                    ]";
            

            //add the JSON header here
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *'); 
            
            echo $diseases;

            // return $diseases
            
    }
}
