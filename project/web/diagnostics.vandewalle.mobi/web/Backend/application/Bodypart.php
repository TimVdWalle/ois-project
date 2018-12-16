<?php
class Bodypart extends CI_Controller {

    public function index()
    {
            echo 'Bodypart api!';
    }

    public function get($searchString) {
            echo "trying sparqlendpoint for: " . $searchString;
    }

    private function safe_JSON($json) {
        if(strlen($json) < 3) {
            return "[]";
        }
        return $json;
    }

    public function get_bodypartsdummy() {
            // dummy
            $parts = "[
                    { \"bodypart\": \"body\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0013702\"},
                    { \"bodypart\": \"head\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0000033\"},
                    { \"bodypart\": \"shoulder\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0001467\"},
                    { \"bodypart\": \"knee\", \"uri\": \"http://purl.obolibrary.org/obo/UBERON_0013702\"},
                    { \"bodypart\": \"toe\", \"uri\": \"http://.../DOID_4931\"}
                    ]";
            

            //add the JSON header here
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *'); 
            
            echo $parts;
    }

    public function get_bodypartsJSON($searchString = "knee") {
        include_once('/home/ois/web/diagnostics.vandewalle.mobi/web/Backend/arc2-master/ARC2.php'); 
                
        $dbpconfig = array(
                "remote_store_endpoint" => "http://sparql.hegroup.org/sparql/",
        );

        $store = ARC2::getRemoteStore($dbpconfig); 

        if ($errs = $store->getErrors()) {
                echo "<h1>getRemoteSotre error</h1>" ;
        }

        // voeg object toe in query
        $query = "
                prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                prefix owl: <http://www.w3.org/2002/07/owl#>
                SELECT distinct ?bodypart_label ?bodypart
                FROM <http://purl.obolibrary.org/obo/merged/UBERON>
                WHERE
                {
                ?bodypart rdfs:label ?bodypart_label .
                FILTER ( REGEX(STR(?bodypart_label), \"$searchString\"))
                }";

        /* execute the query */
        $rows = $store->query($query, 'rows'); 
        //var_dump($rows);
        
        $id = 0;
        
        // VERGEET PUNTKOMMAS NIET
        // return diseases

        $bodyparts = "[";

        /* loop for each returned row */
        foreach( $rows as $row ) { 
                $d_label = $row['bodypart_label'];
                $d_uri = $row['bodypart'];

                $bodypart = "{\"bodypart\": \"$d_label\", \"uri\": \"$d_uri\"},";
                $bodyparts = $bodyparts . $bodypart;
        }
    
        // Smerige comma op het einde verwijderen
        $bodyparts = substr($bodyparts, 0, -1);
        $bodyparts = $bodyparts . "]";

        //add the JSON header here
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); 
        
        $bodyparts = $this->safe_JSON($bodyparts);

        echo $bodyparts;
    }
}
