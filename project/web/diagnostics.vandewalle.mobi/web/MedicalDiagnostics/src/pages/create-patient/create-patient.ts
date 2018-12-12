import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

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

  firstName: any;
  middleNames: any;
  lastName: any;
  birthplace: any;
  birthCountry: any;
  dateOfBirth: any;
  sex: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastController: ToastController) {
    this.userName = navParams.get('userName');

    var initDate = new Date('1970-01-01').toISOString()
    this.dateOfBirth = initDate;

    this.firstName = "";
    this.middleNames = "";
    this.lastName = "";
    this.birthplace = "";
    this.birthCountry = "";
    this.sex = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePatientPage');
  }

  post(patientData){
    console.log("trying to post");

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
  }

  createPatient(){
    console.log(this.firstName + " " + this.sex);

    var patientData = JSON.stringify({
      firstName: this.firstName, 
      middleNames: this.middleNames, 
      lastName: this.lastName, 
      birthplace: this.birthplace, 
      birthCountry: this.birthCountry, 
      dateOfBirth: this.dateOfBirth, 
      sex: this.sex,

      userName: this.userName
    });
    
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
