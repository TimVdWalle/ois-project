import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
//import { v } from '@angular/core/src/render3';

/**
 * Generated class for the CreatePatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-patient',
  templateUrl: 'create-patient.html',
})
export class CreatePatientPage {
  userName: any;  
  isMedicalProfessional: boolean;

  firstName: any;
  middleNames: any;
  lastName: any;
  birthplace: any;
  birthCountry: any;
  dateOfBirth: any;
  sex: any;
  currentLocationLat: any;
  currentLocationLong: any;

  riskFactors: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastController: ToastController, public geolocation: Geolocation) {
    this.userName = navParams.get('userName');

    var initDate = new Date('1970-01-01').toISOString()
    this.dateOfBirth = initDate;

    this.firstName = "";
    this.middleNames = "";
    this.lastName = "";
    this.birthplace = "";
    this.birthCountry = "";
    this.sex = "";

    this.currentLocationLat = -51;
    this.currentLocationLong = -3.2;

    this.getLocation();
    this.loadRiskFactors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePatientPage');
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

    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }

  loadRiskFactors(){
    console.log("fetching riskfactors");

    // riskfactors ophalen
    let url = "http://diagnostics.vandewalle.mobi/Backend/RiskFactor/getAll";
    console.log(url);

    //this.http.get(url).map(res => res.json()).subscribe((data)=>{
    this.http.get(url).map(res => res).subscribe((data)=>{
      var dataString = data.text().replace(/subclass/g, "disease");
      var resJson = JSON.parse(dataString);
      console.log(resJson);

      if(resJson.length > 0){
        this.riskFactors = resJson;
      } else {
        this.riskFactors = [];
      }
    });    
  }

  post(patientData){
    console.log("trying to post");

    // patient data saven
    var link = "http://diagnostics.vandewalle.mobi/Backend/Patient/save_patient/";
    
    this.http.post(link, patientData)
    .subscribe(data => {
      var respons = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      this.presentToast(respons);
      console.log(respons);
    }, error => {
      console.log("Oooops!");
      console.log(error);
      this.presentToast("Something went wrong: " + error);
    });

    // saven van riskfactors
    console.log(this.riskFactors);
  }

  createPatient(){
    console.log(this.firstName + " " + this.sex);

    // riskfactors opvullen met defaults
    var myDate: String = new Date().toISOString();
    this.riskFactors.forEach(element => {
      element.severity = 0;
      element.startTime = myDate;
      element.stopTime = myDate;
      element.longitude = this.currentLocationLong;
      element.latitude = this.currentLocationLat;
    });

    var patientData = JSON.stringify({
      firstName: this.firstName, 
      middleNames: this.middleNames, 
      lastName: this.lastName, 
      birthplace: this.birthplace, 
      birthCountry: this.birthCountry, 
      dateOfBirth: this.dateOfBirth, 
      sex: this.sex,

      userName: this.userName,
      isMedicalProfessional: this.isMedicalProfessional,

      riskFactors: this.riskFactors.filter(riskFactor => riskFactor.isChecked === true)
    });
    
    console.log(patientData)
    this.post(patientData);
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
