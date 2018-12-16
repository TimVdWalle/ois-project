<?php
class Disease extends CI_Controller {

        //  http://diagnostics.vandewalle.mobi/Backend/Disease/

        public function index()
        {
                echo 'Disease api!';
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

        public function get_diseasesDummy($searchString) {
                // echo "looking up diseases for string: " . $searchString

                // dummy
                $diseases = "[
                        { \"disease\": \"cancer of the nasal cavity\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_4931\"},
                        { \"disease\": \"cancer of the stomach\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_5517\"},
                        { \"disease\": \"cancer of the prostate\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_10286\"},
                        { \"disease\": \"cancer of the intestine\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_11239\"},
                        { \"disease\": \"cancer of the skin\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_4159\"},
                        { \"disease\": \"cancer of the eye\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_2174\"},
                        { \"disease\": \"cancer of the kidney\", \"uri\": \"http://purl.obolibrary.org/obo/DOID_263\"}
                        ]";
                

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;

                // return $diseases
                
        }

        /* ============================== TOEGEVOEGD DOOR RONALD ============================== */

        public function get_diseasesTable($searchString = "cancer") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX doid: <http://purl.obolibrary.org/obo/merged/DOID>
            
            SELECT distinct ?disease_label ?disease_object
            FROM doid:
            WHERE {
                ?disease_object rdfs:label ?disease_label .
                FILTER (REGEX(STR(?disease_label), \"$searchString\"))
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease Label</th>
                        <th>Disease Object</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease_label'] . "</td><td>" . 
                $row['disease_object']."</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
                
        }

        public function get_diseasesJSON($searchString = "cancer") {
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
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX doid: <http://purl.obolibrary.org/obo/merged/DOID>
                
                SELECT distinct ?disease_label ?disease_object
                FROM doid:
                WHERE {
                    ?disease_object rdfs:label ?disease_label .
                    FILTER (REGEX(STR(?disease_label), \"$searchString\"))
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $label = $row['disease_label'];
                    $object = $row['disease_object'];
                    $disease = "{\"disease\": \"$label\", \"uri\": \"$object\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *');
                
                $diseases = $this->safe_JSON($diseases);
                
                echo $diseases;
        }

        // ---------------------------------------------------------------------------------------

        // http://sparql.hegroup.org/sparql/
        // https://docs.google.com/document/d/1XZeaG0n1eMDeIn3iL6Z3XXS0hXgyd0TlosSVV-PbyAo/edit
        // https://computersciencews-vub.slack.com/messages/GDF2V7DNG/
        
        public function get_diseaseChildrenDirectTable($disease = "DOID_1319") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX doid: <http://purl.obolibrary.org/obo/>
    
            SELECT distinct ?subclass_label ?subclass_object
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE
            {
            ?subclass_object rdfs:subClassOf doid:$disease .
            ?subclass_object rdfs:label ?subclass_label .
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Subclass Label</th>
                        <th>Subclass Object</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['subclass_label'] . "</td><td>" . 
                $row['subclass_object']."</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }

        public function get_diseaseChildrenDirectJSON($disease = "DOID_1319") {
            // todo
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
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX doid: <http://purl.obolibrary.org/obo/>
        
                SELECT distinct ?subclass_label ?subclass_object
                FROM <http://purl.obolibrary.org/obo/merged/DOID>
                WHERE
                {
                ?subclass_object rdfs:subClassOf doid:$disease .
                ?subclass_object rdfs:label ?subclass_label .
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return subclasses
    
                $subclasses = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $label = $row['subclass_label'];
                    $object = $row['subclass_object'];
                    $subclass = "{\"subclass\": \"$label\", \"uri\": \"$object\"},";
                    $subclasses = $subclasses . $subclass;
    
                }
    
                // Smerige comma op het einde verwijderen
                $subclasses = substr($subclasses, 0, -1);
                $subclasses = $subclasses . "]";

                $subclasses = $this->safe_JSON($subclasses);

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                echo $subclasses;
        }

        // ----------------------------------------------------------------------------------------

        public function get_diseasesForSymptomTable($symptom = "SYMP_0000605") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
                
            SELECT distinct ?disease_object ?disease_label ?symptom_label
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
            ?disease_object rdfs:subClassOf ?r . 
            ?disease_object rdfs:label ?disease_label .
            ?r rdf:type owl:Restriction . 
            ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> . 
            ?r owl:someValuesFrom <http://purl.obolibrary.org/obo/$symptom> . 
            <http://purl.obolibrary.org/obo/$symptom> rdfs:label ?symptom_label .
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease Object</th>
                        <th>Disease Label</th>
                        <th>Symptom Label</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease_object'] . "</td><td>" . 
                $row['disease_label']. "</td><td>" . 
                $row['symptom_label']. "</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }

        public function get_diseasesForSymptomJSON($symptom = "SYMP_0000605") {
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
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    
                SELECT distinct ?disease_object ?disease_label ?symptom_label
                FROM <http://purl.obolibrary.org/obo/merged/DOID>
                WHERE {
                ?disease_object rdfs:subClassOf ?r . 
                ?disease_object rdfs:label ?disease_label .
                ?r rdf:type owl:Restriction . 
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> . 
                ?r owl:someValuesFrom <http://purl.obolibrary.org/obo/$symptom> . 
                <http://purl.obolibrary.org/obo/$symptom> rdfs:label ?symptom_label .
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    
                    $d_object = $row['disease_object'];
                    $d_label = $row['disease_label'];
                    $s_label = $row['symptom_label'];
                    $disease = "{\"disease\": \"$d_label\", \"linkedSymptom\": \"$s_label\", \"uri\": \"$d_object\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;
        }

        public function get_diseaseLabelAndDescriptionAndSymptomsTable($disease = "DOID_0050118") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX obo: <http://purl.obolibrary.org/obo/>     

            SELECT distinct ?disease_label ?disease_description ?symptom_label
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
            <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r . 
            <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label .
            <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description .
            ?r rdf:type owl:Restriction . 
            ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> . 
            ?r owl:someValuesFrom ?s . 
            ?s rdfs:label ?symptom_label .
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease Label</th>
                        <th>Disease Description</th>
                        <th>Symptom Labels</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease_label'] . "</td><td>" . 
                $row['disease_description']. "</td><td>" . 
                $row['symptom_label']. "</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }



        public function get_diseaseLabelAndDescriptionAndSymptomsJSON($disease = "DOID_0050118") {
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
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX obo: <http://purl.obolibrary.org/obo/>     

                    SELECT distinct ?disease_label ?description ?symptom_label
                    From <http://purl.obolibrary.org/obo/merged/DOID>
                    Where {
                    <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r .
                    OPTIONAL {<http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label . }
                    OPTIONAL { <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?description . }
                    OPTIONAL {      ?r rdf:type owl:Restriction .
                    ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                    ?r owl:someValuesFrom ?s .
                    ?s rdfs:label ?symptom_label . }
            }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    //var_dump($row);

                    $d_label = $row['disease_label'];
                    $d_descr = $row['description'];
                    if(isset($row['symptom_label'])){
                            $s_label = $row['symptom_label'];
                    } else {
                            $s_label = "";
                    }
                    $disease = "{\"disease\": \"$d_label\", \"description\": \"$d_descr\", \"symptom\": \"$s_label\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;
        }

        public function get_diseaseLabelAndDescriptionAndSymptomsJSON_OLD($disease = "DOID_0050118") {
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
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX obo: <http://purl.obolibrary.org/obo/>     
    
                SELECT distinct ?disease_label ?disease_description ?symptom_label
                FROM <http://purl.obolibrary.org/obo/merged/DOID>
                WHERE {
                <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r . 
                <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label .
                <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description .
                ?r rdf:type owl:Restriction . 
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> . 
                ?r owl:someValuesFrom ?s . 
                ?s rdfs:label ?symptom_label .
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $d_label = $row['disease_label'];
                    $d_descr = $row['disease_description'];
                    $s_label = $row['symptom_label'];
                    $disease = "{\"disease\": \"$d_label\", \"description\": \"$d_descr\", \"symptom\": \"$s_label\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;
        }

        public function get_diseaseLabelAndDescriptionAndSymptomsListTable($disease = "DOID_0050118") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX obo: <http://purl.obolibrary.org/obo/>
    
            SELECT distinct ?disease_label ?disease_description (concat('[',group_concat(?symptom_label;separator=','),']') as ?symptom_labels)
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
                <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r .
                <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label .
                <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description .
                ?r rdf:type owl:Restriction .
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                ?r owl:someValuesFrom ?s .
                ?s rdfs:label ?symptom_label .
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease Label</th>
                        <th>Disease Description</th>
                        <th>Associated Symptom Labels</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease_label'] . "</td><td>" . 
                $row['disease_description']. "</td><td>" . 
                $row['symptom_labels']. "</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }

        public function get_diseaseLabelAndDescriptionAndSymptomsListJSON($disease = "DOID_0050118") {
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
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX obo: <http://purl.obolibrary.org/obo/>     
        
                SELECT distinct ?disease_label ?disease_description (concat('[',group_concat(?symptom_label;separator=','),']') as ?symptom_labels)
                FROM <http://purl.obolibrary.org/obo/merged/DOID>
                WHERE {
                    <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r .
                    <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label .
                    <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description .
                    ?r rdf:type owl:Restriction .
                    ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                    ?r owl:someValuesFrom ?s .
                    ?s rdfs:label ?symptom_label .
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $d_label = $row['disease_label'];
                    $d_descr = $row['disease_description'];
                    $s_labels = $row['symptom_labels'];
                    $disease = "{\"disease\": \"$d_label\", \"description\": \"$d_descr\", \"associated symptoms\": \"$s_labels\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;
        }

        public function get_descriptionTable($disease = "DOID_8622") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX obo: <http://purl.obolibrary.org/obo/>     
    
            SELECT distinct ?disease_label ?disease_description ?symptom_label
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
            <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r .
            OPTIONAL { <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label . }
            OPTIONAL { <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description . }
            OPTIONAL {      
                    ?r rdf:type owl:Restriction .
                    ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                    ?r owl:someValuesFrom ?s .
                    ?s rdfs:label ?symptom_label . 
                }
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease Label</th>
                        <th>Disease Description</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease_label'] . "</td><td>" . 
                $row['disease_description']. "</td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Raw Data Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }

        public function get_descriptionJSON($disease = "DOID_8622") {
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
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX obo: <http://purl.obolibrary.org/obo/>     
    
            SELECT distinct ?disease_label ?disease_description ?symptom_label
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
            <http://purl.obolibrary.org/obo/$disease> rdfs:subClassOf ?r .
            OPTIONAL { <http://purl.obolibrary.org/obo/$disease> rdfs:label ?disease_label . }
            OPTIONAL { <http://purl.obolibrary.org/obo/$disease> obo:IAO_0000115 ?disease_description . }
            OPTIONAL {      
                    ?r rdf:type owl:Restriction .
                    ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                    ?r owl:someValuesFrom ?s .
                    ?s rdfs:label ?symptom_label . 
                }
            }
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return diseases
    
                $diseases = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $d_label = $row['disease_label'];
                    $d_descr = $row['disease_description'];
                    $disease = "{\"disease\": \"$d_label\", \"description\": \"$d_descr\"},";
                    $diseases = $diseases . $disease;
    
                }
    
                // Smerige comma op het einde verwijderen
                $diseases = substr($diseases, 0, -1);
                $diseases = $diseases . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $diseases = $this->safe_JSON($diseases);

                echo $diseases;
        }

        /*

        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX obo: <http://purl.obolibrary.org/obo/>     

        SELECT distinct ?disease_label ?description ?symptom_label
        FROM <http://purl.obolibrary.org/obo/merged/DOID>
        WHERE {
        <http://purl.obolibrary.org/obo/DOID_8622> rdfs:subClassOf ?r .
        OPTIONAL { <http://purl.obolibrary.org/obo/DOID_8622> rdfs:label ?disease_label . }
        OPTIONAL { <http://purl.obolibrary.org/obo/DOID_8622> obo:IAO_0000115 ?description . }
        OPTIONAL {      
                ?r rdf:type owl:Restriction .
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                ?r owl:someValuesFrom ?s .
                ?s rdfs:label ?symptom_label . 
            }
        }



        */




        
}

        