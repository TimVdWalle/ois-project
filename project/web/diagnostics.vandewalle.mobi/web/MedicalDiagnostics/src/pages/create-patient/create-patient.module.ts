import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePatientPage } from './create-patient';

@NgModule({
  declarations: [
    CreatePatientPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePatientPage),
  ],
})
export class CreatePatientPageModule {}
