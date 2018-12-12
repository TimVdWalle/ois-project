import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

import {Diagnose2Page} from '../diagnose2/diagnose2';

/**
 * Generated class for the DiagnosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diagnose',
  templateUrl: 'diagnose.html',
})
export class DiagnosePage {
  patient: any;
  searchQuery: string = '';
  symptoms: any[];
  selectedSymptoms: any[];
  showButton:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toastController: ToastController
    ) {
    
      this.patient = navParams.get('patient');

      console.log(this.patient);
      this.initializeItems();    
  }

  initializeItems() {
    //this.symptoms = [{ 'symptom': 'backache_local1', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000006'},{ 'symptom': 'joint pain_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000064'},{ 'symptom': 'fever_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000613'},{ 'symptom': 'body ache_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000230'},{ 'symptom': 'slight cough_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000137'}];
    this.selectedSymptoms = [];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    
    if (val && val.trim() != '' && val.trim().length > 2) {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomsFromSearch/" + val.trim();

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        this.symptoms = JSON.parse(data.text());
      });
    }      
  }

  getItemsAlternatives(symptom) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    //const val = ev.target.value;
    
    if (symptom && symptom.trim() != '') {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomsAlternatives/" + symptom;

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        this.symptoms = JSON.parse(data.text());
      });
    }      
  }

  itemSearch(symptom){
    console.log("searching for alternatives for : " + symptom);
    console.log(symptom.symptom);
    this.getItemsAlternatives(symptom.symptom);
  }

  itemSelect(symptom){
    console.log("selecting : " + symptom);
    console.log(symptom.symptom);

    this.selectedSymptoms.push(symptom);
    this.showButton = true;
    this.presentToast("Symptom " + symptom.symptom + " has been selected.");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosePage');
  }

  gotoMakeDiagnose2(){
    this.navCtrl.push(Diagnose2Page, {patient: this.patient, selectedSymptoms: this.selectedSymptoms});
  }

  removeSymptom(symptom){
    console.log("removing symptom");
    console.log(symptom.symptom);
    if (symptom) {
      this.selectedSymptoms = this.selectedSymptoms.filter((item) => {
        return (item != symptom);
      })
    }

    if(this.selectedSymptoms.length == 0){
      this.showButton = false;
    }
  }

  presentToast(message) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }
}
