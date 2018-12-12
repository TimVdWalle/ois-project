<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
*
*/

class Patient_model extends CI_Model {
    public function __construct()	{
        $this->load->database(); 
      }

      public function get($user) {
        if($user != FALSE) {
            //$query = $this->db->get_where('user', array('id' => $id));
            $query = $this->db->get_where('user', array(true));
          return $query->row_array();
        }
        else {
          return FALSE;
        }
      }
}