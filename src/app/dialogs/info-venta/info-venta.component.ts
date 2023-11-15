import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/models/pago.model';

@Component({
  selector: 'app-info-venta',
  templateUrl: './info-venta.component.html',
  styleUrls: ['./info-venta.component.css']
})
export class InfoVentaComponent {


  objPago:Pago

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.objPago = data
  }
}
