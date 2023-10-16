import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destino } from 'src/app/models/destino.model';
import { DestinoService } from 'src/app/services/destino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-destino',
  templateUrl: './add-edit-destino.component.html',
  styleUrls: ['./add-edit-destino.component.css']
})
export class AddEditDestinoComponent implements OnInit {

  nombrePatt = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;
  dirPatt = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s\d]{3,150}$/;
  ubicaPatt = /^[A-Za-z0-9\s,áéíóúüñÁÉÍÓÚÑÜ.#-]{3,150}$/;


  objDestino: Destino = {
    cod_destino: "",
    nombre: "",
    sucursal: "",
    ubicacion: "",
    estado: 1
  }


  constructor(private destinoService: DestinoService, public _dialog: MatDialogRef<AddEditDestinoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    if (this.data) {
      this.objDestino = {
        cod_destino: this.data.cod_destino,
        nombre: this.data.nombre,
        sucursal: this.data.sucursal,
        ubicacion: this.data.ubicacion,
        estado: this.data.estado
      }
    }
  }

  registrarDestino() {

    if (this.validarCampos() == false) {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      })
    
    }else{

    if (this.data) {

      this.destinoService.actualizarDestino(this.objDestino).subscribe(
        d => {
          Swal.fire({ icon: 'info', title: 'Resultado de la actualizacion', text: d.mensaje })
          this._dialog.close(true)
        }
      )

    } else {
      this.destinoService.registrarDestino(this.objDestino).subscribe(
        d => {
          Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: d.mensaje })
          this._dialog.close(true)
        }
      )
    }

  }
  }

  validarCampos(): boolean {
    const añoActual = new Date().getFullYear();
    //console.log(añoActual);

    if (
      !this.objDestino.nombre ||
      !this.objDestino.sucursal ||
      !this.objDestino.ubicacion

    ) {

      return false;
    }

    return true;
  }


}
