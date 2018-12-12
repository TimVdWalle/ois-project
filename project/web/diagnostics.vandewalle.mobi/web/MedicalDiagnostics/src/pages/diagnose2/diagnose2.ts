import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the Diagnose2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diagnose2',
  templateUrl: 'diagnose2.html',
})
export class Diagnose2Page {
  patient: any;
  selectedSymptoms: any[];
  currentLocationLat: any;
  currentLocationLong: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.patient = navParams.get('patient');

    var myDate: String = new Date().toISOString();

    var tempSymptoms = navParams.get('selectedSymptoms');
    tempSymptoms.forEach(element => {
      element.severity = 0;
      element.startTime = myDate;
      element.stopTime = myDate;

      element.latitude = 51;
      element.longitude = 3.2;

      element.Uri_bodypart = "body";
    });

    /*
    this.selectedSymptoms = [
      { 'symptom': 'tv', 'severity':5, 'age':36, 'started':'11/11/2016'},
      { 'symptom': 'rm', 'severity':8, 'age':36, 'started':'11/11/2017'},
      { 'symptom': 'as', 'severity':9, 'age':28, 'started':'11/11/2018'}
    ];
    */

    this.selectedSymptoms = tempSymptoms;
  }

  ionViewDidLoad() {
    this.getLocation();
    console.log('ionViewDidLoad Diagnose2Page');
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      console.log("location = " + location);
      this.currentLocationLat = res.coords.latitude;
      this.currentLocationLong = res.coords.longitude;

      this.selectedSymptoms.forEach(element => {
        element.latitude = this.currentLocationLat;
        element.longitude = this.currentLocationLong;
      });

    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }

  save(){
    console.log("saving");
    
    this.selectedSymptoms.forEach(symptom => {
      console.log("saving" + symptom.iri + "; " + symptom.severity);
    });
  }

}
