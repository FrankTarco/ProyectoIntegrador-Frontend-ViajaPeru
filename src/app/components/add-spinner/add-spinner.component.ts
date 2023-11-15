import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-add-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async ">
  <div class="lds-hourglass"></div>
  </div>
  `,
  styleUrls: ['./add-spinner.component.css']
})
export class AddSpinnerComponent {

  isLoading$ = this.spinnerService.isLoading$;

  constructor(private spinnerService:SpinnerService){}

}
