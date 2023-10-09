import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddPagoClienteComponent } from 'src/app/dialogs/add-pago-cliente/add-pago-cliente.component';

@Component({
  selector: 'app-add-venta-cliente',
  templateUrl: './add-venta-cliente.component.html',
  styleUrls: ['./add-venta-cliente.component.css']
})
export class AddVentaClienteComponent {

  fontStyleControl = new FormControl('');
  fontStyle?: string;
  
  constructor(private dialog:MatDialog){

  }

  openDialog(){
    const dialogRef = this.dialog.open(AddPagoClienteComponent)
  }

}
