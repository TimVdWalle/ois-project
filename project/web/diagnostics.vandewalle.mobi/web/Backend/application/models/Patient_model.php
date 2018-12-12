<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
*
*/

class Patient_model extends CI_Model {
    public function __construct()	{
        $this->load->database(); 
      }

      public function get_patientsForUser($user) {
        if($user != FALSE) {            
            //$query = $this->db->get_where('Patient');

            $query = $this->db->query("SELECT concat(Left(`FirstName`,1),  Left(`LastName`,1)) as 'initials', `FirstName`, `MiddleNames`, `LastName`, `Birthplace`, `Birthcountry`, `Sex`, YEAR(CURRENT_TIMESTAMP) - YEAR(`DateOfBirth`) as 'age', 'never' as 'lastDiagnose' from Patient");
            return $query->result();
            return $query->row_array();
        }
        else {
          return FALSE;
        }
      }
}

/*

      { 'initials': 'tv', 'fullName': 'Tim Vande Walle', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'rm', 'fullName': 'Ronald Michiels', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'as', 'fullName': 'Astrid', 'age':28, 'lastDiagnose':'never'}

*/