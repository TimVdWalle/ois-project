webpackJsonp([0],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsPageModule", function() { return PatientsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_text_avatar__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__patients__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//import {DiagnosePage} from '../diagnose/diagnose'
var PatientsPageModule = /** @class */ (function () {
    function PatientsPageModule() {
    }
    PatientsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__patients__["a" /* PatientsPage */]
                //, DiagnosePage
                ,
                __WEBPACK_IMPORTED_MODULE_2_ionic_text_avatar__["a" /* IonTextAvatar */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__patients__["a" /* PatientsPage */])
            ],
        })
    ], PatientsPageModule);
    return PatientsPageModule;
}());

//# sourceMappingURL=patients.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ion_text_avatar_ion_text_avatar__ = __webpack_require__(287);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_ion_text_avatar_ion_text_avatar__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonTextAvatar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IonTextAvatar = (function (_super) {
    __extends(IonTextAvatar, _super);
    function IonTextAvatar(config, elementRef, renderer) {
        return _super.call(this, config, elementRef, renderer, 'ion-text-avatar') || this;
    }
    IonTextAvatar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: 'ion-text-avatar',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], IonTextAvatar);
    return IonTextAvatar;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Ion */]));

//# sourceMappingURL=ion-text-avatar.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__diagnose_diagnose__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_patient_create_patient__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_disease_search_disease__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {LoginPage} from '../login/login';




/**
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PatientsPage = /** @class */ (function () {
    function PatientsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.userName = navParams.get('userName');
        if (this.userName == undefined) {
            this.userName = "tim@vandewalle.mobi";
        }
        this.loadPatients();
        this.patients = [
            { 'initials': 'tv', 'fullName': 'Tim Vande Walle', 'age': 36, 'lastDiagnose': '7 days ago' },
            { 'initials': 'rm', 'fullName': 'Ronald Michiels', 'age': 36, 'lastDiagnose': '7 days ago' },
            { 'initials': 'as', 'fullName': 'Astrid', 'age': 28, 'lastDiagnose': 'never' }
        ];
    }
    PatientsPage.prototype.showMessage = function (patient) {
        console.log("showMessage : " + patient);
    };
    PatientsPage.prototype.gotoMakeDiagnose = function (patient) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__diagnose_diagnose__["a" /* DiagnosePage */], { patient: patient });
    };
    PatientsPage.prototype.gotoCreatePatient = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__create_patient_create_patient__["a" /* CreatePatientPage */], { userName: this.userName });
    };
    PatientsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PatientsPage');
    };
    PatientsPage.prototype.loadPatients = function () {
        var _this = this;
        // get patiens data from api
        var url = "http://diagnostics.vandewalle.mobi/Backend/Patient/get_patientsForUser/tim";
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            //console.log(data);
            _this.patients = data;
        });
    };
    PatientsPage.prototype.refresh = function () {
        this.loadPatients();
    };
    PatientsPage.prototype.searchDisease = function () {
        console.log("goto searchDisease");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__search_disease_search_disease__["a" /* SearchDiseasePage */], { userName: this.userName });
    };
    PatientsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-patients',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/patients/patients.html"*/'<!--\n  Generated template for the PatientsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>patients</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            Select patient\n          </ion-card-header>\n          <ion-card-content>\n            These are the patients that you can diagnose.\n            <br />\n            You are logged in as <i>{{this.userName}}.</i>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n          <button ion-button (click)="gotoCreatePatient()">register new patient</button>\n          \n          <br />\n          <button ion-button (click)="refresh()">refresh</button>\n          \n          <br />\n          <button ion-button (click)="searchDisease()">search disease</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n  <ion-list>\n    <ion-item *ngFor="let patient of patients" (click)="showMessage(patient)">\n      <ion-avatar item-start>\n        <button ion-button color="secondary" round>{{patient.initials}}</button>\n      </ion-avatar>\n      <h2>{{patient["FirstName"]}} {{patient["MiddleNames"]}} {{patient["LastName"]}}</h2>\n      <h3>{{patient.age}} years</h3>\n      <p>Last diagnose <i>{{patient.lastDiagnose}}</i></p>\n\n      <button ion-button clear item-end><button ion-button (click)="gotoMakeDiagnose(patient)">make diagnose</button></button>\n    </ion-item>\n\n\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/patients/patients.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]])
    ], PatientsPage);
    return PatientsPage;
}());

//# sourceMappingURL=patients.js.map

/***/ })

});
//# sourceMappingURL=0.js.map