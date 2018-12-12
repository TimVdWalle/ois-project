import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
//import { PatientsPage } from '../pages/patients/patients';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { DiagnosePage } from '../pages/diagnose/diagnose';
import { Diagnose2Page } from '../pages/diagnose2/diagnose2';
import { CreatePatientPage } from '../pages/create-patient/create-patient';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DiagnosePage,
    Diagnose2Page,
    CreatePatientPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DiagnosePage,
    Diagnose2Page,
    CreatePatientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Geolocation
  ]
})
export class AppModule {}
