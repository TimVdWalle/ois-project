<?php
class Symptom extends CI_Controller {

        // http://diagnostics.vandewalle.mobi/Backend/Symptom/

        public function index()
        {
                echo 'Symptom api!';
        }

        public function safe_JSON($json) {
            if(strlen($json) < 3) {
                return "[]";
            }
            return $json;
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

                $symptoms = $this->safe_JSON($symptoms);

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

                $symptoms = $this->safe_JSON($symptoms);

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


        /* ============================== TOEGEVOEGD DOOR RONALD ============================== */

        public function get_symptomsTable($searchString = "fever") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/merged/SYMP>
                
                SELECT distinct ?symptom_label ?symptom_object
                FROM symp:
                WHERE
                {
                ?symptom_object rdfs:label ?symptom_label .
                FILTER (REGEX(STR(?symptom_label), \"$searchString\"))
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                /* display the results in an HTML table */
                echo "<table border='1'>
                    <thead>
                            <th>#</th>
                            <th>Symptom Label</th>
                            <th>Symptom Object</th>
                    </thead>";
    
                $id = 0;
                
                // return diseases
    
                $diseases = array();
    
                /* loop for each returned row */
                foreach( $rows as $row ) { 
                    print "<tr><td>".++$id. "</td>
                    <td>". $row['symptom_label'] . "</td><td>" . 
                    $row['symptom_object']."</td>";
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

        public function get_symptomsJSON($searchString = "fever") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/merged/SYMP>
                
                SELECT distinct ?symptom_label ?symptom_object
                FROM symp:
                WHERE
                {
                ?symptom_object rdfs:label ?symptom_label .
                FILTER (REGEX(STR(?symptom_label), \"$searchString\"))
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 

    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return symptoms
    
                $symptoms = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $label = $row['symptom_label'];
                    $object = $row['symptom_object'];
                    $symptom = "{\"symptom\": \"$label\", \"uri\": \"$object\"},";
                    $symptoms = $symptoms . $symptom;
    
                }
    
                // Smerige comma op het einde verwijderen
                $symptoms = substr($symptoms, 0, -1);
                $symptoms = $symptoms . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *');

                $symptoms = $this->safe_JSON($symptoms);
                
                echo $symptoms;
        }

        // ---------------------------------------------------------------------------------------

        public function get_symptomChildrenDirectTable($symptom = "SYMP_0000613") {
                // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000613" (fever)
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>

                SELECT distinct ?subclass_label ?subclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                ?subclass_object rdfs:subClassOf symp:$symptom .
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

        public function get_symptomChildrenDirectJSON($symptom = "SYMP_0000613") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>

                SELECT distinct ?subclass_label ?subclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                ?subclass_object rdfs:subClassOf symp:$symptom .
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

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *'); 
                
                $subclasses = $this->safe_JSON($subclasses);

                echo $subclasses;
        }

        // ---------------------------------------------------------------------------------------

        public function get_symptomChildrenTreeTable($symptom = "SYMP_0000613") {
                // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000613" (fever)
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>

                SELECT distinct ?subclass_label ?subclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                ?subclass_object rdfs:subClassOf* symp:$symptom .
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

        public function get_symptomChildrenTreeJSON($symptom = "SYMP_0000613") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>

                SELECT distinct ?subclass_label ?subclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                ?subclass_object rdfs:subClassOf* symp:$symptom .
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

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *');

                $subclasses = $this->safe_JSON($subclasses);
                
                echo $subclasses;
        }

        // ---------------------------------------------------------------------------------------

        public function get_symptomParentTreeTable($symptom = "SYMP_0000613") {
                // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000613" (fever)
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>
                
                SELECT distinct ?superclass_label ?superclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                symp:$symptom rdfs:subClassOf* ?superclass_object.
                ?superclass_object rdfs:label ?superclass_label .
                }
                
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 

    
                /* display the results in an HTML table */
                echo "<table border='1'>
                    <thead>
                            <th>#</th>
                            <th>Superclass Label</th>
                            <th>Superclass Object</th>
                    </thead>";
    
                $id = 0;
                
                // return diseases
    
                $diseases = array();
    
                /* loop for each returned row */
                foreach( $rows as $row ) { 
                    print "<tr><td>".++$id. "</td>
                    <td>". $row['superclass_label'] . "</td><td>" . 
                    $row['superclass_object']."</td>";
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

        public function get_symptomParentTreeJSON($symptom = "SYMP_0000613") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>
                
                SELECT distinct ?superclass_label ?superclass_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                {
                symp:$symptom rdfs:subClassOf* ?superclass_object.
                ?superclass_object rdfs:label ?superclass_label .
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return superclasses
    
                $superclasses = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $label = $row['superclass_label'];
                    $object = $row['superclass_object'];
                    $superclass = "{\"superclass\": \"$label\", \"uri\": \"$object\"},";
                    $superclasses = $superclasses . $superclass;
    
                }
    
                // Smerige comma op het einde verwijderen
                $superclasses = substr($superclasses, 0, -1);
                $superclasses = $superclasses . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *');

                $superclasses = $this->safe_JSON($superclasses);
                
                echo $superclasses;
        }

        // ---------------------------------------------------------------------------------------

        public function get_symptomParentsAndChildrenTable($symptom = "SYMP_0000881") {
                // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000881" (mild fever)
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>
                
                SELECT distinct ?class_label ?class_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                { ?class_object rdfs:label ?class_label .
                { SELECT ?class_object WHERE {
                ?class_object rdfs:subClassOf* symp:$symptom .
                } }
                UNION
                { SELECT ?class_object WHERE {
                symp:$symptom rdfs:subClassOf* ?class_object .
                } }
                }
                
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
    
                /* display the results in an HTML table */
                echo "<table border='1'>
                    <thead>
                            <th>#</th>
                            <th>Class Label</th>
                            <th>Class Object</th>
                    </thead>";
    
                $id = 0;
                
                // return diseases
    
                $diseases = array();
    
                /* loop for each returned row */
                foreach( $rows as $row ) { 
                    print "<tr><td>".++$id. "</td>
                    <td>". $row['class_label'] . "</td><td>" . 
                    $row['classs_object']."</td>";
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

        public function get_symptomParentsAndChildrenJSON($symptom = "SYMP_0000881") {
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
                PREFIX symp: <http://purl.obolibrary.org/obo/>
                
                SELECT distinct ?class_label ?class_object
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE
                { ?class_object rdfs:label ?class_label .
                { SELECT ?class_object WHERE {
                ?class_object rdfs:subClassOf* symp:$symptom .
                } }
                UNION
                { SELECT ?class_object WHERE {
                symp:$symptom rdfs:subClassOf* ?class_object .
                } }
                }
                ";
    
                /* execute the query */
                $rows = $store->query($query, 'rows'); 
    
                $id = 0;
                
                // VERGEET PUNTKOMMAS NIET
                // return classes
    
                $classes = "[";

                /* loop for each returned row */
                foreach( $rows as $row ) { 
    
                    $label = $row['class_label'];
                    $object = $row['class_object'];
                    $class = "{\"class\": \"$label\", \"uri\": \"$object\"},";
                    $classes = $classes . $class;
    
                }
    
                // Smerige comma op het einde verwijderen
                $classes = substr($classes, 0, -1);
                $classes = $classes . "]";

                //add the JSON header here
                header('Content-Type: application/json');
                header('Access-Control-Allow-Origin: *');

                $classes = $this->safe_JSON($classes);
                
                echo $classes;
        }

        public function get_linkedDiseasesOfSubclassSymptomTable($sumperclassSymptom = "SYMP_0000482") {

            // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000881" (mild fever)
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
            PREFIX symp: <http://purl.obolibrary.org/obo/>
                
            SELECT distinct ?disease_object ?disease_label ?symptom_object
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
                ?disease_object rdfs:subClassOf ?r .
                ?disease_object rdfs:label ?disease_label .
                ?r rdf:type owl:Restriction .
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                ?r owl:someValuesFrom ?symptom_object .
                {
                    SELECT distinct ?symp_label ?subclassen
                    FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                    WHERE {
                            ?subclassen rdfs:subClassOf* symp:$sumperclassSymptom .
                            ?subclassen rdfs:label ?symp_label .
                    }
                }
            }
            
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 


            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Symptom Object</th>
                        <th>Disease Label</th>
                        <th>Disease Object</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['symptom_object'] . "</td><td>" . 
                $row['disease_label']."</td><td>" .
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

        public function get_linkedDiseasesOfSubclassSymptomJSON($sumperclassSymptom) {
            
            // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000881" (mild fever)
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
            PREFIX symp: <http://purl.obolibrary.org/obo/>
                
            SELECT distinct ?disease_object ?disease_label ?symptom_object
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
                ?disease_object rdfs:subClassOf ?r .
                ?disease_object rdfs:label ?disease_label .
                ?r rdf:type owl:Restriction .
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                ?r owl:someValuesFrom ?symptom_object .
                {
                    SELECT distinct ?symp_label ?subclassen
                    FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                    WHERE {
                            ?subclassen rdfs:subClassOf* symp:$sumperclassSymptom .
                            ?subclassen rdfs:label ?symp_label .
                    }
                }
            }
            
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 


            $id = 0;
                
            // VERGEET PUNTKOMMAS NIET
            // return classes

            $classes = "[";

            /* loop for each returned row */
            foreach( $rows as $row ) { 

                $d_object = $row['disease_object'];
                $d_label = $row['disease_label'];
                $s_object = $row['symptom_object'];

                $class = "{\"symptom object\": \"$s_object\", \"disease\": \"$d_label\", \"disease object\": \"$s_object\"},";
                $classes = $classes . $class;

            }

            // Smerige comma op het einde verwijderen
            $classes = substr($classes, 0, -1);
            $classes = $classes . "]";

            //add the JSON header here
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');

            $classes = $this->safe_JSON($classes);
            
            echo $classes;

        }

        /*

        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX symp: <http://purl.obolibrary.org/obo/>
            
        SELECT DISTINCT ?disease_object ?disease_label ?symptom_object
        FROM <http://purl.obolibrary.org/obo/merged/DOID>
        WHERE {
            ?disease_object rdfs:subClassOf ?r .
            ?disease_object rdfs:label ?disease_label .
            ?r rdf:type owl:Restriction .
            ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
            ?r owl:someValuesFrom ?symptom_object .
            {
                SELECT DISTINCT ?symp_label ?subclassen
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE {
                        ?subclassen rdfs:subClassOf* symp:SYMP_0000482 .
                        ?subclassen rdfs:label ?symp_label .
                }
            }
        }


        */

        public function get_linkedDiseasesOfMultipleSubclassSymptomTable($sumperclassSymptoms) {

        }

        public function get_linkedDiseasesOfMultipleSubclassSymptomJSON($sumperclassSymptoms) {
            
        }

        /*

        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX symp: <http://purl.obolibrary.org/obo/>
            
        SELECT distinct ?disease ?disease_label ?symptom ?symp_label
        FROM <http://purl.obolibrary.org/obo/merged/DOID>
        WHERE {
            ?disease rdfs:subClassOf ?r .
            ?disease rdfs:label ?disease_label .
            ?r rdf:type owl:Restriction .
            ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
            ?r owl:someValuesFrom ?symptom .
            {
                SELECT distinct ?symp_label ?symptom
                FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                WHERE {
                        ?symptom rdfs:subClassOf* ?symptomname .
                        ?symptom rdfs:label ?symp_label .
                        
                        VALUES ?symptomname { symp:SYMP_0000482 symp:SYMP_0000210 }

                }
            }
        } 

        */

        public function get() {
            // Geef een Symptom Object ID hieraan mee, bv. "SYMP_0000881" (mild fever)
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
            PREFIX symp: <http://purl.obolibrary.org/obo/>
            
            SELECT distinct ?disease ?disease_label ?description (COUNT(?symptom) as ?probability) (concat('[',group_concat(?symp_label;separator=','),']') as ?symptom_labels)
            WHERE {     
                SELECT distinct ?disease ?disease_label ?description ?symptom ?symp_label
                FROM <http://purl.obolibrary.org/obo/merged/DOID>
                WHERE {
                    ?disease rdfs:subClassOf ?r .
                    ?disease rdfs:label ?disease_label .
    
                    OPTIONAL { ?disease obo:IAO_0000115 ?description . }
    
                    ?r rdf:type owl:Restriction .
                    ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                    ?r owl:someValuesFrom ?symptom .
                    {
                        SELECT distinct ?symp_label ?symptom
                        FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                        WHERE {
                            ?symptom rdfs:subClassOf* ?symptomname .
                            ?symptom rdfs:label ?symp_label . 
    
                            VALUES ?symptomname { symp:SYMP_0000367 symp:SYMP_0000760 symp:SYMP_0000482 }
    
                        }
                    }
               } 
            } 
            
            ORDER BY DESC(?probability)
            
            ";

            /* execute the query */
            $rows = $store->query($query, 'rows'); 


            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Disease</th>
                        <th>Disease Label</th>
                        <th>Description</th>
                </thead>";

            $id = 0;
            
            // return diseases

            $diseases = array();

            /* loop for each returned row */
            foreach( $rows as $row ) { 
                print "<tr><td>".++$id. "</td>
                <td>". $row['disease'] . "</td><td>" . 
                $row['disease_label']."</td><td>" .
                $row['description']."</td>";
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

        /*

        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX symp: <http://purl.obolibrary.org/obo/>
        
        SELECT distinct ?disease ?disease_label ?description (COUNT(?symptom) as ?probability) (concat('[',group_concat(?symp_label;separator=","),']') as ?symptom_labels)
        WHERE {     
            SELECT distinct ?disease ?disease_label ?description ?symptom ?symp_label
            FROM <http://purl.obolibrary.org/obo/merged/DOID>
            WHERE {
                ?disease rdfs:subClassOf ?r .
                ?disease rdfs:label ?disease_label .

                OPTIONAL { ?disease obo:IAO_0000115 ?description . }

                ?r rdf:type owl:Restriction .
                ?r owl:onProperty <http://purl.obolibrary.org/obo/doid#has_symptom> .
                ?r owl:someValuesFrom ?symptom .
                {
                    SELECT distinct ?symp_label ?symptom
                    FROM <http://purl.obolibrary.org/obo/merged/SYMP>
                    WHERE {
                        ?symptom rdfs:subClassOf* ?symptomname .
                        ?symptom rdfs:label ?symp_label . 

                        VALUES ?symptomname { symp:SYMP_0000367 symp:SYMP_0000760 symp:SYMP_0000482 }

                    }
                }
           } 
        } 
        
        ORDER BY DESC(?probability)


        */




}