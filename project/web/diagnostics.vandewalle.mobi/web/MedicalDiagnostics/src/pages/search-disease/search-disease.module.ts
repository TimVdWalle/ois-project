import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchDiseasePage } from './search-disease';

@NgModule({
  declarations: [
    SearchDiseasePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchDiseasePage),
  ],
})
export class SearchDiseasePageModule {}
