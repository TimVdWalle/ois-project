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

            $sql = "SELECT 
                      concat(Left(Patient.`FirstName`,1),  
                      Left(Patient.`LastName`,1)) as 'initials', 
                      Patient.`FirstName`, 
                      Patient.`MiddleNames`, 
                      Patient.`LastName`, 
                      Patient.`Birthplace`, 
                      Patient.`Birthcountry`, 
                      Patient.`DateOfBirth`, 
                      Patient.`Sex`, 
                      YEAR(CURRENT_TIMESTAMP) - YEAR(Patient.`DateOfBirth`) as 'age', 
                      'never' as 'lastDiagnose' 
                      from Patient
                      inner join `ProvidesInfoAbout`
                      on 
                      Patient.`DateOfBirth` = `ProvidesInfoAbout`.`DateOfBirth`
                      and Patient.`FirstName` = `ProvidesInfoAbout`.`FirstName`
                      and Patient.`MiddleNames` = `ProvidesInfoAbout`.`MiddleNames`
                      and Patient.`LastName` = `ProvidesInfoAbout`.`LastName`
                      and Patient.`Birthplace` = `ProvidesInfoAbout`.`Birthplace`
                      and Patient.`Birthcountry` = `ProvidesInfoAbout`.`Birthcountry`
                      
                      where `ProvidesInfoAbout`.`Username`  like '" . urldecode($user) . "'";

            //echo $sql;
            $query = $this->db->query($sql);

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