import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  objDestino: Destino = {
    cod_destino: "",
    nombre: "",
    sucursal: "",
    ubicacion: "",
    estado: 1
  }

  formRegistra = this.formBuilder.group({
    validaNombre:['', [Validators.required,Validators.pattern('[a-zA-ZáéíóúüÁÉÍÓÚñÑÜ ]{3,30}')]],
    validaSucursal:['', [Validators.required,Validators.pattern('[a-zA-ZáéíóúüÁÉÍÓÚñÑÜ0-9 ]{3,150}')]],
    validaUbicacion:['', [Validators.required,Validators.pattern('[A-Za-z0-9 ,áéíóúüñÁÉÍÓÚÑÜ.#-]{3,150}')]],
    validaEstado:['',[Validators.min(0)]]
  })


  constructor(private destinoService: DestinoService, public _dialog: MatDialogRef<AddEditDestinoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder:FormBuilder) { }


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


    if (!this.formRegistra.valid) {

      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      })
    
    }else if (this.validarCampos() == false && this.estado == 'nombre') {
      Swal.fire({
        icon: 'info',
        title: 'Ingrese Nombre de Destino Correcto',
        text: "Solo caracteres alfabeticos",
      })

    } else if (this.validarCampos() == false && this.estado == 'sucursal') {
      Swal.fire({
        icon: 'info',
        title: 'Ingrese una Surcursal Correcta',
        text: "Para el campo sucrusal solo caracteres alfabeticos y numericos",
      })

    } else if (this.validarCampos() == false && this.estado == 'ubi') {
      Swal.fire({
        icon: 'info',
        title: 'Ingrese Ubicacion correcta',
        text: "La entrada debe cumplir con el patrón de entre 3 y 150 caracteres, comenzando y terminando con letras, números, espacios, comas, acentos o los símbolos .#-",
      })

    }else if (this.validarCampos() == true){

    if (this.data) {

      this.destinoService.actualizarDestino(this.objDestino).subscribe(
        d => {
          if(d.mensaje.includes("Error")){
            Swal.fire({ icon: 'error', title: 'Algo salio mal', text: d.mensaje })
          }
          else{
            Swal.fire({ icon: 'success', title: 'Resultado de la actualizacion', text: d.mensaje })
            this._dialog.close(true)
          }    
        }
      )

    } else {
      this.destinoService.registrarDestino(this.objDestino).subscribe(
        d => {

          if(d.mensaje.includes("Error")){
            Swal.fire({ icon: 'error', title: 'Algo salio mal', text: d.mensaje })
          }
          else{
            Swal.fire({ icon: 'success', title: 'Resultado', text: d.mensaje })
            this._dialog.close(true)
          }   
        }
      )
    }

  }
  }


}
