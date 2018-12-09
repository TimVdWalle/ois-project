import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosePage } from './diagnose';

@NgModule({
  declarations: [
    DiagnosePage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosePage),
  ],
})
export class DiagnosePageModule {}
