import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SearchDiseasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-disease',
  templateUrl: 'search-disease.html',
})
export class SearchDiseasePage {
  userName: any;
  diseases: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toastController: ToastController) {
    this.userName = navParams.get('userName');
    if(this.userName == undefined){
      this.userName = "tim@vandewalle.mobi";
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    
    if (val && val.trim() != '' && val.trim().length > 2) {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseasesJSON/" + val.trim();

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        this.diseases = JSON.parse(data.text());

        console.log(this.diseases);
      });
    }      
  }

  getItemsAlternatives(disease) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    //const val = ev.target.value;

    //symptomUri = "SYMP_0000883"
    
    
    var removePart = "http://purl.obolibrary.org/obo/";
    //symptomUri = symptomUri.substring( 0, symptomUri.indexOf( removePart ));

    var diseaseUri = disease.uri.replace(removePart, "");
    console.log(diseaseUri);
    
    this.diseases = [disease];

    /*
    // parents ophalen
    if (diseaseUri && diseaseUri.trim() != '') {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomChildrenDirectJSON/" + diseaseUri;
      console.log("retrieving children");

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        var dataString = data.text().replace(/subclass/g, "symptom");
        console.log(JSON.parse(dataString));

        var currentList = this.diseases;
        var newList = currentList.concat(JSON.parse(dataString));
        this.diseases = newList;

        //this.symptoms.push(JSON.parse(data.text()));
      });
    }    
    */ 

    // children ophalen
    if (diseaseUri && diseaseUri.trim() != '') {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseaseChildrenDirectJSON/" + diseaseUri;
      console.log("retrieving disease childre");
      console.log();

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        var dataString = data.text().replace(/subclass/g, "disease");
        console.log(JSON.parse(dataString));

        var currentList = this.diseases;
        var newList = currentList.concat(JSON.parse(dataString));
        this.diseases = newList;

        //this.symptoms = JSON.parse(data.text());
      });
    }     
  }

  itemInfo(disease){
    console.log("looking up information for " + disease.disease);
    console.log("looking up information for " + disease.uri);
    
  
    var removePart = "http://purl.obolibrary.org/obo/";
    var diseaseUri = disease.uri.replace(removePart, "");
    console.log(diseaseUri);

    var description = "";
    var symptoms = [];

    // description + symptoms hophalen
    if (diseaseUri && diseaseUri.trim() != '') {
      let url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseaseLabelAndDescriptionAndSymptomsJSON/" + diseaseUri;
      console.log("retrieving disease info : description + symptoms");
      console.log(url);

      //this.http.get(url).map(res => res.json()).subscribe((data)=>{
      this.http.get(url).map(res => res).subscribe((data)=>{
        var dataString = data.text().replace(/subclass/g, "disease");
        var resJson = JSON.parse(dataString);
        console.log(resJson);

        if(resJson.length > 0){
          description = resJson[0].description;
        } else {
          description = "no information found for " + disease.disease;
        }

        description = disease.disease + ": " + description;
        

        this.presentToast(description);

        /*
        var currentList = this.diseases;
        var newList = currentList.concat(JSON.parse(dataString));
        this.diseases = newList;
        */

        //this.symptoms = JSON.parse(data.text());
      });
    }     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchDiseasePage');
  }

  presentToast(message) {
    const toast = this.toastController.create({
      message: message,
      duration: 60000,
      position: "middle",
      showCloseButton: true
    });
    toast.present();
  }

}
