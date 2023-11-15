import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpinnerComponent } from './add-spinner.component';



@NgModule({
  declarations: [AddSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports:[AddSpinnerComponent]
})
export class AddSpinnerModule { }
