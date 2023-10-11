import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-venta-pasajero',
  templateUrl: './add-venta-pasajero.component.html',
  styleUrls: ['./add-venta-pasajero.component.css']
})
export class AddVentaPasajeroComponent {

  isCollapsed = false;

  
  pasajeros = [{ nombre: '', edad: '' }];

  fontStyleControl = new FormControl('');
  fontStyle?: string;
  
  agregarPasajero() {
    this.pasajeros.push({ nombre: '', edad: '' });
  }
  submitForm() {
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log('Formulario enviado:', this.pasajeros);
  }
  toggleItem() {
    this.isCollapsed = !this.isCollapsed;
  }

}
