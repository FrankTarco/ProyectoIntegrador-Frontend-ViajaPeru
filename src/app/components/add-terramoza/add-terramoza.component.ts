import { Component,OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TerramozaService } from 'src/app/services/terramoza.service';
import { Terramoza } from 'src/app/models/terramoza.model';
import jspdf from 'jspdf';
import { AddEditTerramozaComponent } from 'src/app/dialogs/add-edit-terramoza/add-edit-terramoza.component';
import { ImpresionService } from 'src/app/services/impresion.service';

@Component({
  selector: 'app-add-terramoza',
  templateUrl: './add-terramoza.component.html',
  styleUrls: ['./add-terramoza.component.css']
})
export class AddTerramozaComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'apellido p', 'apellido m', 'documento', 'numero doc', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lstTerramozas:Terramoza[] = []

  constructor(private terramozaService:TerramozaService,
    public dialog:MatDialog,private impresionService:ImpresionService){ }


  ngOnInit(): void {
    this.listaTerramozas();
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddEditTerramozaComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.listaTerramozas();
        }
      },
    });
  }

  openEditDialog(data:any){
    const dialogRef = this.dialog.open(AddEditTerramozaComponent, {data,});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.listaTerramozas();
        }
      },
    });
  }


  listaTerramozas(){
    this.terramozaService.listadoTerramozas().subscribe({
      next: (rest) =>{
        this.dataSource = new MatTableDataSource(rest)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:console.log
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  imprimirTerramozaPdf(){
    const encabezado = ['codigo', 'nombre', 'apellido paterno', 'apellido materno', 'documento']
    const cuerpo = this.dataSource.data.map(terramozaItem => [
      terramozaItem.cod_terramoza,
      terramozaItem.nombre,
      terramozaItem.ape_pater,
      terramozaItem.ape_mater,
      terramozaItem.numerodocumento
    ]);
    const doc = new jspdf();
        this.impresionService.imprimir(encabezado, cuerpo, 'Reporte de terramozas', true)
    }
  


  eliminar(codigo:string){

    Swal.fire({
      icon:'warning',
      title:'¿Estas seguro?', 
      text: 'Eliminar Terramoza '+codigo,
      showCancelButton:true,
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6',
      confirmButtonText:'Si eliminar'
      }).then((result) => {
        if (result.isConfirmed){
          this.terramozaService.eliminarTerramoza(codigo).subscribe(
            x => {
              if(x.mensaje.includes("Error")){
                Swal.fire({icon:'error',title:'Resultado', text: x.mensaje});
              }
              else{
                Swal.fire({icon:'success',title:'Resultado', text: x.mensaje});
                this.listaTerramozas();
              }             
            }
          )
          
        }
      })  ;

  }

}
