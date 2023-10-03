import { Component,OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TerramozaService } from 'src/app/services/terramoza.service';
import { UtilService } from 'src/app/services/util.service';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { Terramoza } from 'src/app/models/terramoza.model';
import { AddEditTerramozaComponent } from 'src/app/dialogs/add-edit-terramoza/add-edit-terramoza.component';

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
    public dialog:MatDialog){ }


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

  eliminar(codigo:string){
    this.terramozaService.eliminarTerramoza(codigo).subscribe({

      next: (rest) =>{
        Swal.fire({icon:'info',title:'Resultado de la eliminacion', text: rest.mensaje});
        this.listaTerramozas();
      },
      error: console.log,
    });
  }

}
