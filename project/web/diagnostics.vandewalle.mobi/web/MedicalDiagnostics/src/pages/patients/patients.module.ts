import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonTextAvatar } from 'ionic-text-avatar';
import { PatientsPage } from './patients';
//import {DiagnosePage} from '../diagnose/diagnose'

@NgModule({
  declarations: [
    PatientsPage
    //, DiagnosePage
    , IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(PatientsPage)
  ],
})



export class PatientsPageModule {}
