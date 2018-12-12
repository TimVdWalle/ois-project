<?php
class Disease extends CI_Controller {

        public function index()
        {
                echo 'Disease api!';
        }

        public function get($searchString) {
                echo "trying sparqlendpoint for: " . $searchString;
        }

        public function get_diseases($searchString) {
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
                
                echo $diseases;

                // return $diseases
                
        }

        public function get_sparqlTestForObject($objectString = "DOID_5517") {
            include_once('/home/ois/web/diagnostics.vandewalle.mobi/web/Backend/arc2-master/ARC2.php'); 
            
            $dbpconfig = array(
            "remote_store_endpoint" => "http://sparql.hegroup.org/sparql/",
            );

            $store = ARC2::getRemoteStore($dbpconfig); 

            if ($errs = $store->getErrors()) {
            echo "<h1>getRemoteSotre error</h1>" ;
            }

            // voeg object toe in query

            $query = '
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX doid: <http://purl.obolibrary.org/obo/merged/DOID>
                
                SELECT * 
                FROM doid:
                WHERE {
                        ?subject rdf:type ?object .
                        FILTER ( ?subject = <http://purl.obolibrary.org/obo/DOID_5517> )
                } 
                LIMIT 25
            ';

            /* execute the query */
            $rows = $store->query($query, 'rows'); 

            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }

            /* display the results in an HTML table */
            echo "<table border='1'>
                <thead>
                        <th>#</th>
                        <th>Subject</th>
                        <th>Object</th>
                </thead>";

            $id = 0;
            
            /* loop for each returned row */
            foreach( $rows as $row ) { 
            print "<tr><td>".++$id. "</td>
            <td><a href='". $row['subject'] . "'>" . 
            $row['object']."</a></td><td>";
            }

            echo "</table>" ;
            echo "<p> This is a SPARQL Test ! </p>";
            echo "<h3> Query: </h3>";
            echo "<p> $query </p>";
            echo "<h3> Results: </h3>";
            print_r($rows);
            echo "<h3> Errors: </h3>";
            if ($errs = $store->getErrors()) {
                echo "Query errors" ;
                print_r($errs);
            }
        }



        /*
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
                
                // Provides info
                // Provides info about self
                // Parameter van frontend nodig (user nodig > )

                //echo "ok from server" .$firstName + " " + $dateOfBirth;
                //echo "ok from server" . "j";
                

        }
        */
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