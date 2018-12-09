webpackJsonp([0],{

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsPageModule", function() { return PatientsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_text_avatar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__patients__ = __webpack_require__(281);
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

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ion_text_avatar_ion_text_avatar__ = __webpack_require__(280);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_ion_text_avatar_ion_text_avatar__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonTextAvatar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
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

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__diagnose_diagnose__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(100);
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
    function PatientsPage(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        // get patiens data from api
        var url = "http://diagnostics.vandewalle.mobi/Backend/Patient/get_patientsForUser/tim";
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log(data);
            _this.patients = data;
        });
        // get username from localstorage
        storage.get('userName').then(function (val) {
            console.log('Your userName', val);
            _this.userName = val;
        });
        this.patients = [
            { 'initials': 'tv', 'fullName': 'Tim Vande Walle', 'age': 36, 'lastDiagnose': '7 days ago' },
            { 'initials': 'rm', 'fullName': 'Ronald Michiels', 'age': 36, 'lastDiagnose': '7 days ago' },
            { 'initials': 'as', 'fullName': 'Astrid', 'age': 28, 'lastDiagnose': 'never' }
        ];
    }
    PatientsPage.prototype.showMessage = function (patient) {
        console.log(patient);
    };
    PatientsPage.prototype.gotoMakeDiagnose = function (patient) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__diagnose_diagnose__["a" /* DiagnosePage */], { patient: patient });
    };
    PatientsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PatientsPage');
    };
    PatientsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-patients',template:/*ion-inline-start:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/patients/patients.html"*/'<!--\n  Generated template for the PatientsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>patients</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            Select patient\n          </ion-card-header>\n          <ion-card-content>\n            These are the patients that you can diagnose.\n            <br />\n            You are logged in as <i>{{this.userName}}.</i>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n        <!--<button ion-button (click)="gotoMakeDiagnose()">make diagnose</button>-->\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n  <ion-list>\n    <ion-item *ngFor="let patient of patients" (click)="showMessage(patient)">\n      <ion-avatar item-start>\n        <button ion-button color="secondary" round>{{patient.initials}}</button>\n      </ion-avatar>\n      <h2>{{patient["First name"]}} ({{patient["Middle names"]}}) {{patient["Last name"]}}</h2>\n      <h3>{{patient.age}} years</h3>\n      <p>Last diagnose <i>{{patient.lastDiagnose}}</i></p>\n\n      <button ion-button clear item-end><button ion-button (click)="gotoMakeDiagnose(patient)">make diagnose</button></button>\n    </ion-item>\n\n\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/timvandewalle/LocalDocuments/VUB/OIS/project/web/diagnostics.vandewalle.mobi/web/MedicalDiagnostics/src/pages/patients/patients.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _d || Object])
    ], PatientsPage);
    return PatientsPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=patients.js.map

/***/ })

});
//# sourceMappingURL=0.js.map