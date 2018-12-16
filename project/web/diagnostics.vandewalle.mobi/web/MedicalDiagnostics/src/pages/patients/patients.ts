import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonTextAvatar } from 'ionic-text-avatar';
//import {LoginPage} from '../login/login';
import {DiagnosePage} from '../diagnose/diagnose';
import { Http } from '@angular/http';

import { CreatePatientPage } from '../create-patient/create-patient';
import { SearchDiseasePage } from '../search-disease/search-disease';

/**
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
  patients: any;
  userName: any;
  isMedicalProfessional: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.userName = navParams.get('userName');
    this.isMedicalProfessional = navParams.get('isMedicalProfessional');
    if(this.userName == undefined){
      this.userName = "tim@vandewalle.mobi";
      this.isMedicalProfessional = false;
    }

    this.loadPatients();
    
    this.patients = [
      { 'initials': 'tv', 'fullName': 'Tim Vande Walle', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'rm', 'fullName': 'Ronald Michiels', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'as', 'fullName': 'Astrid', 'age':28, 'lastDiagnose':'never'}
    ];
  }

  showMessage(patient){
    console.log("showMessage : " + patient);
  }

  gotoMakeDiagnose(patient){
    this.navCtrl.push(DiagnosePage, {patient: patient});
  }

  gotoCreatePatient(){
    this.navCtrl.push(CreatePatientPage, {userName: this.userName, isMedicalProfessional: this.isMedicalProfessional});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsPage');
  }

  loadPatients(){
    // get patiens data from api
    let url = "http://diagnostics.vandewalle.mobi/Backend/Patient/get_patientsForUser/" + encodeURIComponent(this.userName);
    console.log("url = " + url);
    this.http.get(url).map(res => res.json()).subscribe(data => {
        //console.log(data);
        this.patients = data;
    });
  }

  refresh(){
    this.loadPatients();
  }

  searchDisease(){
    console.log("goto searchDisease");
    this.navCtrl.push(SearchDiseasePage, {userName: this.userName});
  }
}
