import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http'; //https://stackoverflow.com/questions/43609853/angular-4-and-ionic-3-no-provider-for-http
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: Http) {

  }

  post(){
    console.log("trying to post");

    var link = 'https://ois-test.free.beeceptor.com';
    link = "http://diagnostics.vandewalle.mobi/Backend/Patient/save_patient/";
    var myData = JSON.stringify({firstName: "tim"});
    
    this.http.post(link, myData)
    .subscribe(data => {
      var respons = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      console.log("ok");
      console.log(respons);
      alert(respons);
    }, error => {
    console.log("Oooops!");
    alert(error);
    });
  }
}
