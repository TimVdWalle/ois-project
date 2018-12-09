import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonTextAvatar } from 'ionic-text-avatar';
//import {LoginPage} from '../login/login';
import {DiagnosePage} from '../diagnose/diagnose';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {
    // get patiens data from api
    let url = "http://diagnostics.vandewalle.mobi/Backend/Patient/get_patientsForUser/tim";
    this.http.get(url).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.patients = data;
    });

    // get username from localstorage
    storage.get('userName').then((val) => {
      console.log('Your userName', val);
      this.userName = val;
    });
    
    this.patients = [
      { 'initials': 'tv', 'fullName': 'Tim Vande Walle', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'rm', 'fullName': 'Ronald Michiels', 'age':36, 'lastDiagnose':'7 days ago'},
      { 'initials': 'as', 'fullName': 'Astrid', 'age':28, 'lastDiagnose':'never'}
    ];
  }

  showMessage(patient){
    console.log(patient);
  }

  gotoMakeDiagnose(patient){
    this.navCtrl.push(DiagnosePage, {patient: patient});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsPage');
  }

}
