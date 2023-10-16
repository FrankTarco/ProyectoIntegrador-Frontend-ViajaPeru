import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditDestinoComponent } from 'src/app/dialogs/add-edit-destino/add-edit-destino.component';
import { DestinoService } from 'src/app/services/destino.service';
import Swal from 'sweetalert2';
import jspdf from 'jspdf';
import { ImpresionService } from 'src/app/services/impresion.service';

@Component({
  selector: 'app-add-destino',
  templateUrl: './add-destino.component.html',
  styleUrls: ['./add-destino.component.css']
})
export class AddDestinoComponent {

  displayedColumns: string[] = ['codigo', 'nombre', 'sucursal', 'ubicacion', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private destinoService:DestinoService,private dialog:MatDialog,private impresionService:ImpresionService){}


  openDialog(){
    const dialog = this.dialog.open(AddEditDestinoComponent);
    dialog.afterClosed().subscribe({  
      next: (val) => {
        if(val){
          this.listadoDestinos();
        }
      },
    });
    
    }
    
    openEditDialog(data:any){
      const dialog = this.dialog.open(AddEditDestinoComponent, {data,});
      dialog.afterClosed().subscribe({  
        next: (val) => {
          if(val){
            this.listadoDestinos();
          }
        },
      });
    }
    
    
      ngOnInit(): void {
       this.listadoDestinos();
      }
    
    listadoDestinos(){
    this.destinoService.listadoDestinos().subscribe({
     next:(res) =>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     },
    error: console.log
    });
    }
    
    eliminarDestino(codigo:string){

     Swal.fire({
        icon:'warning',
        title:'¿Estas seguro?', 
        text: 'Eliminar el Destino '+codigo,
        showCancelButton:true,
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText:'Si eliminar'
        }).then((result) => {
          if (result.isConfirmed){
            this.destinoService.eliminarDestino(codigo).subscribe(
              x => {
                if(x.mensaje.includes("Error")){
                  Swal.fire({icon:'error',title:'Resultado', text: x.mensaje});
                }
                else{
                  Swal.fire({icon:'success',title:'Resultado', text: x.mensaje});
                  this.listadoDestinos();
                }             
              }
            )
            
          }
        })  ;
    }
    
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    imprimirPdf(){
      const encabezado = ['Nombre', 'Sucursal','Ubicacion']
      const cuerpo = this.dataSource.data.map(destino => [
        destino.nombre,
        destino.sucursal,
        destino.ubicacion
      ]);
      const doc = new jspdf();
          this.impresionService.imprimir(encabezado, cuerpo, 'Reporte de Destinos', true)
      }

}
