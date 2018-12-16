webpackJsonp([7],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Diagnose2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the Diagnose2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Diagnose2Page = /** @class */ (function () {
    function Diagnose2Page(navCtrl, navParams, http, toastController, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.geolocation = geolocation;
        this.patient = navParams.get('patient');
        var myDate = new Date().toISOString();
        var tempSymptoms = navParams.get('selectedSymptoms');
        tempSymptoms.forEach(function (element) {
            element.severity = 0;
            element.startTime = myDate;
            element.stopTime = myDate;
            element.latitude = 51;
            element.longitude = 3.2;
            element.Uri_bodypart = undefined;
            element.bodypart = undefined;
            element.bodyparts = [];
        });
        this.selectedSymptoms = tempSymptoms;
    }
    Diagnose2Page.prototype.ionViewDidLoad = function () {
        this.getLocation();
        console.log('ionViewDidLoad Diagnose2Page');
    };
    Diagnose2Page.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (res) {
            // resp.coords.latitude
            // resp.coords.longitude
            //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
            var location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
            console.log("location = " + location);
            _this.currentLocationLat = res.coords.latitude;
            _this.currentLocationLong = res.coords.longitude;
            _this.selectedSymptoms.forEach(function (element) {
                element.latitude = _this.currentLocationLat;
                element.longitude = _this.currentLocationLong;
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    Diagnose2Page.prototype.getBodyparts = function (ev, symptom) {
        // Reset items back to all of the items
        //this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        if (val && val.trim() != '' && val.trim().length > 2) {
            var url_1 = "http://diagnostics.vandewalle.mobi/Backend/Bodypart/get_bodypartsJSON/" + val.trim();
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url_1).map(function (res) { return res; }).subscribe(function (data) {
                console.log("retrieving bodyparts");
                console.log(url_1);
                console.log(JSON.parse(data.text()));
                symptom.bodyparts = JSON.parse(data.text());
            });
        }
    };
    Diagnose2Page.prototype.itemSelect = function (bodypart, symptom) {
        console.log(bodypart);
        symptom.Uri_bodypart = bodypart.uri;
        symptom.bodypart = bodypart.bodypart;
        console.log("setting bp = ");
        console.log(symptom.bodypart);
        symptom.bodyparts = [];
    };
    Diagnose2Page.prototype.removeBodyPart = function (symptom) {
        symptom.Uri_bodypart = undefined;
        symptom.bodypart = undefined;
        symptom.bodyparts = [];
    };
    Diagnose2Page.prototype.save = function () {
        console.log("saving symptoms");
        var symptomData = JSON.stringify({
            firstName: this.patient.FirstName,
            middleNames: this.patient.MiddleNames,
            lastName: this.patient.LastName,
            birthplace: this.patient.Birthplace,
            birthCountry: this.patient.Birthcountry,
            dateOfBirth: this.patient.DateOfBirth,
            symptoms: this.selectedSymptoms
        });
        console.log("patient = " + this.patient);
        console.log(this.patient["FirstName"]);
        console.log(symptomData);
        this.post(symptomData);
    };
    Diagnose2Page.prototype.post = function (data) {
        var _this = this;
        console.log("trying to post");
        // patient data saven
        var link = "http://diagnostics.vandewalle.mobi/Backend/Patient/save_patientSymptoms/";
        this.http.post(link, data)
            .subscribe(function (data) {
            var respons = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
            _this.presentToast(respons);
            console.log(respons);
        }, function (error) {
            console.log("Oooops!");
            console.log(error);
            _this.presentToast("Something went wrong: " + error);
        });
    };
    Diagnose2Page.prototype.presentToast = function (message) {
        var toast = this.toastController.create({
            message: message,
            duration: 3000,
            position: "top"
        });
        toast.present();
    };
    Diagnose2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-diagnose2',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/diagnose2/diagnose2.html"*/'<!--\n  Generated template for the Diagnose2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Make diagnose 2/2</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n                Selected patient: <i>{{patient["FirstName"]}} {{patient["MiddleNames"]}} {{patient["LastName"]}}</i>\n          </ion-card-header>\n          <ion-card-content>\n              <br />\n            Selected symptoms: \n            <br />\n            <br />\n            <span *ngFor="let symptom of selectedSymptoms"><ion-badge color="danger">{{ symptom.symptom }}</ion-badge>&nbsp;</span>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n        <button ion-button clear item-end><button ion-button (click)="save()">diagnose</button></button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row  *ngFor="let symptom of selectedSymptoms">\n        <ion-card>\n            <ion-card-header color="primary">{{ symptom.symptom }}</ion-card-header>\n            <ion-card-content>\n                <ion-grid>\n                    <ion-row >\n                        <ion-col col-3 style="padding-top: 16px;">Severity?</ion-col>\n                        <ion-col col-6>\n                            <ion-range min="0" max="10" [(ngModel)]="symptom.severity" color="danger">\n                                <ion-label range-left>0</ion-label>\n                                <ion-label range-right>10</ion-label>\n                              </ion-range><ion-badge item-end color="danger" style="float:right;">{{symptom.severity}}</ion-badge>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col col-3 style="padding-top: 16px;">Started when?</ion-col>\n                        <ion-col col-6>\n                            <ion-datetime displayFormat="DD/MM/YYYY"   pickerFormat="DD/MM/YYYY"[(ngModel)]="symptom.startTime"></ion-datetime>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col col-3 style="padding-top: 16px;">Ended when?</ion-col>\n                        <ion-col col-6>\n                            <ion-datetime displayFormat="DD/MM/YYYY"  pickerFormat="DD/MM/YYYY" [(ngModel)]="symptom.stopTime"></ion-datetime>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col col-3 style="padding-top: 16px;">Location </ion-col>\n                        <ion-col col-6>\n                            <table>\n                                <tr>\n                                <td>\n                                <a href="http://www.mapdevelopers.com/geocode_tool.php" target="_blank">latitude</a>:\n                                </td>\n                                <td>\n                                <ion-input  placeholder="Latitude" [(ngModel)]="symptom.latitude"></ion-input>\n                                </td>\n                                </tr>\n                                <tr>\n                                <td><a href="http://www.mapdevelopers.com/geocode_tool.php" target="_blank">longitude</a>:</td>\n                                <td><ion-input  placeholder="Longitude" [(ngModel)]="symptom.longitude"></ion-input></td>\n                                </tr>\n                            </table>   \n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col col-3 fstyle="padding-top: 16px;">Affects bodypart? </ion-col>\n                        <ion-col col-6>\n                            <span *ngIf="symptom.Uri_bodypart !== empty" (click)="removeBodyPart(symptom)">\n                                    <ion-badge item-end color="secundary">{{symptom.bodypart}}</ion-badge>\n                            </span>\n                            <div *ngIf="symptom.Uri_bodypart == empty">\n                                <ion-searchbar (ionInput)="getBodyparts($event, symptom)"></ion-searchbar>\n                                <ion-list>\n                                <ion-item *ngFor="let bodypart of symptom.bodyparts">\n                                    {{ bodypart.bodypart }}\n                                    <button ion-button clear item-end (click)="itemSelect(bodypart, symptom)">Select</button>\n                                </ion-item>\n                                </ion-list>\n                            </div>\n                        </ion-col>\n                    </ion-row>\n                  </ion-grid>\n            </ion-card-content>\n        </ion-card>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/diagnose2/diagnose2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], Diagnose2Page);
    return Diagnose2Page;
}());

//# sourceMappingURL=diagnose2.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPage = /** @class */ (function () {
    function LoginPage(nav, auth, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.registerCredentials = { email: '', password: '' };
    }
    LoginPage.prototype.createAccount = function () {
        this.nav.push('RegisterPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                _this.nav.setRoot('PatientsPage', { userName: _this.registerCredentials.email, isMedicalProfessional: false });
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(alert);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n      <img src="../assets/imgs/logo.png" width="200" height="200"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n          <button ion-button="" class="register-btn" full="" type="button" block="" clear="" (click)="createAccount()">Create New Account</button>\n\n        </ion-col>\n      </ion-row>\n      \n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { Storage } from '@ionic/storage';
var User = /** @class */ (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    return User;
}());

var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                var access = ((credentials.password === "t" && credentials.email === "t") || (credentials.password === "test" && credentials.email === "tim@vandewalle.mobi")
                    || (credentials.password === "a" && credentials.email === "a") || (credentials.password === "test" && credentials.email === "astrid.sierens@vub.be")
                    || (credentials.password === "r" && credentials.email === "r") || (credentials.password === "test" && credentials.email === "ronald.irenus.michiels@vub.be"));
                if (credentials.email === "t" || credentials.email === "tim@vandewalle.mobi") {
                    _this.currentUser = new User('test', 'tim@vandewalle.mobi');
                }
                else if (credentials.email === "a" || credentials.email === "astrid.sierens@vub.be") {
                    _this.currentUser = new User('test', 'astrid.sierens@vub.be');
                }
                else if (credentials.email === "r" || credentials.email === "ronald.irenus.michiels@vub.be") {
                    _this.currentUser = new User('test', 'ronald.irenus.michiels@vub.be');
                }
                //this.storage.set('userName', "test");
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthService.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-patient/create-patient.module": [
		285,
		6
	],
	"../pages/diagnose/diagnose.module": [
		279,
		5
	],
	"../pages/diagnose2/diagnose2.module": [
		280,
		4
	],
	"../pages/login/login.module": [
		281,
		3
	],
	"../pages/patients/patients.module": [
		283,
		0
	],
	"../pages/register/register.module": [
		282,
		1
	],
	"../pages/search-disease/search-disease.module": [
		284,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagnosePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diagnose2_diagnose2__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DiagnosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DiagnosePage = /** @class */ (function () {
    function DiagnosePage(navCtrl, navParams, http, toastController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.searchQuery = '';
        this.showButton = false;
        this.searchbar = "";
        this.patient = navParams.get('patient');
        console.log(this.patient);
        this.initializeItems();
        this.searchbar = "";
    }
    DiagnosePage.prototype.initializeItems = function () {
        //this.symptoms = [{ 'symptom': 'backache_local1', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000006'},{ 'symptom': 'joint pain_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000064'},{ 'symptom': 'fever_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000613'},{ 'symptom': 'body ache_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000230'},{ 'symptom': 'slight cough_local', 'iri': 'http://purl.obolibrary.org/obo/SYMP_0000137'}];
        this.selectedSymptoms = [];
    };
    DiagnosePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        //this.initializeItems();
        var _this = this;
        // set val to the value of the searchbar
        var val = ev.target.value;
        if (val && val.trim() != '' && val.trim().length > 2) {
            var url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomsJSON/" + val.trim();
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                console.log("retrieving searched symptoms");
                console.log(JSON.parse(data.text()));
                _this.symptoms = JSON.parse(data.text());
            });
        }
    };
    DiagnosePage.prototype.getItemsAlternatives = function (symptomUri) {
        // Reset items back to all of the items
        //this.initializeItems();
        var _this = this;
        // set val to the value of the searchbar
        //const val = ev.target.value;
        //symptomUri = "SYMP_0000883"
        var removePart = "http://purl.obolibrary.org/obo/";
        //symptomUri = symptomUri.substring( 0, symptomUri.indexOf( removePart ));
        symptomUri = symptomUri.replace(removePart, "");
        console.log(symptomUri);
        this.symptoms = [];
        // parent(s) ophalen
        if (symptomUri && symptomUri.trim() != '') {
            var url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomParentTreeJSON/" + symptomUri;
            console.log("retrieving parents");
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                var dataString = data.text().replace(/superclass/g, "symptom");
                console.log(JSON.parse(dataString));
                var currentList = _this.symptoms;
                var newList = currentList.concat(JSON.parse(dataString));
                _this.symptoms = newList;
                //this.symptoms = JSON.parse(data.text());
            });
        }
        // children ophalen
        if (symptomUri && symptomUri.trim() != '') {
            var url = "http://diagnostics.vandewalle.mobi/Backend/Symptom/get_symptomChildrenDirectJSON/" + symptomUri;
            console.log("retrieving children");
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                var dataString = data.text().replace(/subclass/g, "symptom");
                console.log(JSON.parse(dataString));
                var currentList = _this.symptoms;
                var newList = currentList.concat(JSON.parse(dataString));
                _this.symptoms = newList;
                //this.symptoms.push(JSON.parse(data.text()));
            });
        }
    };
    DiagnosePage.prototype.itemSearch = function (symptom) {
        console.log("searching for alternatives for : " + symptom.uri);
        console.log(symptom.symptom);
        this.getItemsAlternatives(symptom.uri);
    };
    DiagnosePage.prototype.itemSelect = function (symptom) {
        console.log("selecting : " + symptom);
        console.log(symptom.symptom);
        this.selectedSymptoms.push(symptom);
        this.showButton = true;
        this.presentToast("Symptom " + symptom.symptom + " has been selected.");
        this.searchbar = "";
        //this.symptoms = [];
    };
    DiagnosePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DiagnosePage');
    };
    DiagnosePage.prototype.gotoMakeDiagnose2 = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__diagnose2_diagnose2__["a" /* Diagnose2Page */], { patient: this.patient, selectedSymptoms: this.selectedSymptoms });
    };
    DiagnosePage.prototype.removeSymptom = function (symptom) {
        console.log("removing symptom");
        console.log(symptom.symptom);
        if (symptom) {
            this.selectedSymptoms = this.selectedSymptoms.filter(function (item) {
                return (item != symptom);
            });
        }
        if (this.selectedSymptoms.length == 0) {
            this.showButton = false;
        }
    };
    DiagnosePage.prototype.itemInfo = function (disease) {
        console.log("showing info for" + disease);
    };
    DiagnosePage.prototype.presentToast = function (message) {
        var toast = this.toastController.create({
            message: message,
            duration: 3000,
            position: "top"
        });
        toast.present();
    };
    DiagnosePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-diagnose',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/diagnose/diagnose.html"*/'<!--\n  Generated template for the DiagnosePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Make diagnose</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            Selected patient: <i>{{patient["FirstName"]}} {{patient["MiddleNames"]}} {{patient["LastName"]}}</i>\n          </ion-card-header>\n          <ion-card-content>\n            Please enter some symptoms.\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n      Selected symptoms\n      <br />\n      <span *ngFor="let symptom of selectedSymptoms"><ion-badge (click)="removeSymptom(symptom)" color="danger">{{ symptom.symptom }}{{ symptom.superclass }}{{ symptom.subclass }}</ion-badge>&nbsp;</span>\n      <br />\n\n      <button ion-button clear item-end *ngIf="showButton"><button ion-button (click)="gotoMakeDiagnose2()">next</button></button>\n\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n        <ion-col>\n          <ion-searchbar (ionInput)="getItems($event)" [(ngModel)]="searchbar">search</ion-searchbar>\n          <ion-list>\n            <ion-item *ngFor="let symptom of symptoms">\n              {{ symptom.symptom }}\n              <button ion-button clear item-end (click)="itemSearch(symptom)">Search</button>\n              <button ion-button clear item-end (click)="itemSelect(symptom)">Select</button>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/diagnose/diagnose.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], DiagnosePage);
    return DiagnosePage;
}());

//# sourceMappingURL=diagnose.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePatientPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { v } from '@angular/core/src/render3';
/**
 * Generated class for the CreatePatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatePatientPage = /** @class */ (function () {
    function CreatePatientPage(navCtrl, navParams, http, toastController, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.geolocation = geolocation;
        this.userName = navParams.get('userName');
        var initDate = new Date('1970-01-01').toISOString();
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
    CreatePatientPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatePatientPage');
    };
    CreatePatientPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (res) {
            // resp.coords.latitude
            // resp.coords.longitude
            //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
            var location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
            console.log("location = " + location);
            _this.currentLocationLat = res.coords.latitude;
            _this.currentLocationLong = res.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    CreatePatientPage.prototype.loadRiskFactors = function () {
        var _this = this;
        console.log("fetching riskfactors");
        // riskfactors ophalen
        var url = "http://diagnostics.vandewalle.mobi/Backend/RiskFactor/getAll";
        console.log(url);
        //this.http.get(url).map(res => res.json()).subscribe((data)=>{
        this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
            var dataString = data.text().replace(/subclass/g, "disease");
            var resJson = JSON.parse(dataString);
            console.log(resJson);
            if (resJson.length > 0) {
                _this.riskFactors = resJson;
            }
            else {
                _this.riskFactors = [];
            }
        });
    };
    CreatePatientPage.prototype.post = function (patientData) {
        var _this = this;
        console.log("trying to post");
        // patient data saven
        var link = "http://diagnostics.vandewalle.mobi/Backend/Patient/save_patient/";
        this.http.post(link, patientData)
            .subscribe(function (data) {
            var respons = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
            _this.presentToast(respons);
            console.log(respons);
        }, function (error) {
            console.log("Oooops!");
            console.log(error);
            _this.presentToast("Something went wrong: " + error);
        });
        // saven van riskfactors
        console.log(this.riskFactors);
    };
    CreatePatientPage.prototype.createPatient = function () {
        var _this = this;
        console.log(this.firstName + " " + this.sex);
        // riskfactors opvullen met defaults
        var myDate = new Date().toISOString();
        this.riskFactors.forEach(function (element) {
            element.severity = 0;
            element.startTime = myDate;
            element.stopTime = myDate;
            element.longitude = _this.currentLocationLong;
            element.latitude = _this.currentLocationLat;
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
            riskFactors: this.riskFactors.filter(function (riskFactor) { return riskFactor.isChecked === true; })
        });
        console.log(patientData);
        this.post(patientData);
    };
    CreatePatientPage.prototype.presentToast = function (message) {
        var toast = this.toastController.create({
            message: message,
            duration: 3000,
            position: "top"
        });
        toast.present();
    };
    CreatePatientPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-patient',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/create-patient/create-patient.html"*/'<!--\n  Generated template for the CreatePatientsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n      <ion-title>Register new patient</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-card>\n            <ion-card-header>\n              Register patient\n            </ion-card-header>\n            <ion-card-content>\n              You are logged in as <i>{{this.userName}}.</i>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n        <ion-col>\n          <button ion-button (click)="createPatient()">save</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  \n    <ion-card>\n        <ion-card-header color="primary">Register patient</ion-card-header>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row >\n                    <ion-col col-3 >First Name</ion-col>\n                    <ion-col col-6>\n                        <input [(ngModel)]="firstName">\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-3 >Middle Names</ion-col>\n                    <ion-col col-6>\n                        <input [(ngModel)]="middleNames">\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-3 >Last Name</ion-col>\n                    <ion-col col-6>\n                        <input [(ngModel)]="lastName">\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col col-3 >Sex</ion-col>\n                    <ion-col col-6>\n                                <ion-list [(ngModel)]="sex" radio-group>\n                                    <ion-item>\n                                        <ion-label style="font-size: 70%;">Male</ion-label>\n                                        <ion-radio value="M"></ion-radio>\n                                    </ion-item>\n                                    \n                                    <ion-item>\n                                        <ion-label style="font-size: 70%;">Female</ion-label>\n                                        <ion-radio value="F"></ion-radio>\n                                    </ion-item>\n                                </ion-list>\n                    </ion-col>\n                </ion-row>\n\n\n\n\n\n\n                <ion-row>\n                    <ion-col col-3 >Birthplace </ion-col>\n                    <ion-col col-6>\n                        <input [(ngModel)]="birthplace">                                      \n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-3 >Birth Country</ion-col>\n                    <ion-col col-6>\n                        <input [(ngModel)]="birthCountry">\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-3 >Date Of Birth</ion-col>\n                    <ion-col col-6>\n                        <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dateOfBirth"></ion-datetime>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col col-3 style="padding-top: 16px;">Location </ion-col>\n                    <ion-col col-6>\n                        <table>\n                            <tr>\n                            <td>\n                            <a href="http://www.mapdevelopers.com/geocode_tool.php" target="_blank">latitude</a>:\n                            </td>\n                            <td>\n                            <ion-input  placeholder="Latitude" [(ngModel)]="currentLocationLat"></ion-input>\n                            </td>\n                            </tr>\n                            <tr>\n                            <td><a href="http://www.mapdevelopers.com/geocode_tool.php" target="_blank">longitude</a>:</td>\n                            <td><ion-input  placeholder="Longitude" [(ngModel)]="currentLocationLong"></ion-input></td>\n                            </tr>\n                        </table>   \n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                        <ion-col col-3 >Risk Factors</ion-col>\n                        <ion-col col-6>\n                                <ion-list>\n                                        <ion-item text-wrap *ngFor="let riskFactor of riskFactors">\n                                            <ion-label style="font-size: 70%;">{{ riskFactor.Name }} </ion-label>\n                                            <ion-checkbox [(ngModel)]="riskFactor.isChecked" checked="false"></ion-checkbox>\n                                        </ion-item>\n                                </ion-list>\n                        </ion-col>\n                    </ion-row>\n            </ion-grid>\n        </ion-card-content>\n    </ion-card>\n  </ion-content>\n  '/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/create-patient/create-patient.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], CreatePatientPage);
    return CreatePatientPage;
}());

//# sourceMappingURL=create-patient.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchDiseasePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchDiseasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchDiseasePage = /** @class */ (function () {
    function SearchDiseasePage(navCtrl, navParams, http, toastController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.userName = navParams.get('userName');
        if (this.userName == undefined) {
            this.userName = "tim@vandewalle.mobi";
        }
    }
    SearchDiseasePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        //this.initializeItems();
        var _this = this;
        // set val to the value of the searchbar
        var val = ev.target.value;
        if (val && val.trim() != '' && val.trim().length > 2) {
            var url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseasesJSON/" + val.trim();
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                _this.diseases = JSON.parse(data.text());
                console.log(_this.diseases);
            });
        }
    };
    SearchDiseasePage.prototype.getItemsAlternatives = function (disease) {
        // Reset items back to all of the items
        //this.initializeItems();
        var _this = this;
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
            var url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseaseChildrenDirectJSON/" + diseaseUri;
            console.log("retrieving disease childre");
            console.log();
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                var dataString = data.text().replace(/subclass/g, "disease");
                console.log(JSON.parse(dataString));
                var currentList = _this.diseases;
                var newList = currentList.concat(JSON.parse(dataString));
                _this.diseases = newList;
                //this.symptoms = JSON.parse(data.text());
            });
        }
    };
    SearchDiseasePage.prototype.itemInfo = function (disease) {
        var _this = this;
        console.log("looking up information for " + disease.disease);
        console.log("looking up information for " + disease.uri);
        var removePart = "http://purl.obolibrary.org/obo/";
        var diseaseUri = disease.uri.replace(removePart, "");
        console.log(diseaseUri);
        var description = "";
        var symptoms = [];
        // description + symptoms hophalen
        if (diseaseUri && diseaseUri.trim() != '') {
            var url = "http://diagnostics.vandewalle.mobi/Backend/Disease/get_diseaseLabelAndDescriptionAndSymptomsJSON/" + diseaseUri;
            console.log("retrieving disease info : description + symptoms");
            console.log(url);
            //this.http.get(url).map(res => res.json()).subscribe((data)=>{
            this.http.get(url).map(function (res) { return res; }).subscribe(function (data) {
                var dataString = data.text().replace(/subclass/g, "disease");
                var resJson = JSON.parse(dataString);
                console.log(resJson);
                if (resJson.length > 0) {
                    description = resJson[0].description;
                }
                else {
                    description = "no information found for " + disease.disease;
                }
                description = disease.disease + ": " + description;
                _this.presentToast(description);
                /*
                var currentList = this.diseases;
                var newList = currentList.concat(JSON.parse(dataString));
                this.diseases = newList;
                */
                //this.symptoms = JSON.parse(data.text());
            });
        }
    };
    SearchDiseasePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchDiseasePage');
    };
    SearchDiseasePage.prototype.presentToast = function (message) {
        var toast = this.toastController.create({
            message: message,
            duration: 60000,
            position: "middle",
            showCloseButton: true
        });
        toast.present();
    };
    SearchDiseasePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-disease',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/search-disease/search-disease.html"*/'<!--\n  Generated template for the search-disease page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Search disease</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            Search disease\n          </ion-card-header>\n          <ion-card-content>\n            You are logged in as <i>{{this.userName}}.</i>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n        \n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card>\n      <ion-card-header color="primary"><ion-searchbar (ionInput)="getItems($event)"></ion-searchbar></ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item *ngFor="let disease of diseases">\n            {{ disease.disease }}\n            <button ion-button clear item-end (click)="getItemsAlternatives(disease)">Search</button>\n            <button ion-button clear item-end (click)="itemInfo(disease)">Info</button>\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/search-disease/search-disease.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], SearchDiseasePage);
    return SearchDiseasePage;
}());

//# sourceMappingURL=search-disease.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_diagnose_diagnose__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_diagnose2_diagnose2__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_create_patient_create_patient__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_disease_search_disease__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








//import { RegisterPage } from '../pages/register/register';
//import { PatientsPage } from '../pages/patients/patients';







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_diagnose_diagnose__["a" /* DiagnosePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_diagnose2_diagnose2__["a" /* Diagnose2Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_create_patient_create_patient__["a" /* CreatePatientPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_disease_search_disease__["a" /* SearchDiseasePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/diagnose/diagnose.module#DiagnosePageModule', name: 'DiagnosePage', segment: 'diagnose', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/diagnose2/diagnose2.module#Diagnose2PageModule', name: 'Diagnose2Page', segment: 'diagnose2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/patients/patients.module#PatientsPageModule', name: 'PatientsPage', segment: 'patients', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-disease/search-disease.module#SearchDiseasePageModule', name: 'SearchDiseasePage', segment: 'search-disease', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/create-patient/create-patient.module#CreatePatientPageModule', name: 'CreatePatientPage', segment: 'create-patient', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_diagnose_diagnose__["a" /* DiagnosePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_diagnose2_diagnose2__["a" /* Diagnose2Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_create_patient_create_patient__["a" /* CreatePatientPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_disease_search_disease__["a" /* SearchDiseasePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { RegisterPage } from '../pages/register/register';
//import { PatientsPage } from '../pages/patients/patients';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map