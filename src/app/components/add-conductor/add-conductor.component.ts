import {AfterViewInit, Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditConductorComponent } from 'src/app/dialogs/add-edit-conductor/add-edit-conductor.component';
import { ConductorService } from 'src/app/services/conductor.service';
import { Conductor } from 'src/app/models/conductor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-conductor',
  templateUrl: './add-conductor.component.html',
  styleUrls: ['./add-conductor.component.css']
})
export class AddConductorComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'TipoDoc', 'Documento', 'Apellidos', 'Nombres', 'tipolicencia', 'nrolicencia', 'telefono','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private conductorService:ConductorService, public dialog:MatDialog){
}


openDialog(){
const dialog = this.dialog.open(AddEditConductorComponent);
dialog.afterClosed().subscribe({  
  next: (val) => {
    if(val){
      this.listadoConductor();
    }
  },
});

}

openEditDialog(data:any){
  const dialog = this.dialog.open(AddEditConductorComponent, {data,});
  dialog.afterClosed().subscribe({  
    next: (val) => {
      if(val){
        this.listadoConductor();
      }
    },
  });
}


  ngOnInit(): void {
   this.listadoConductor();
  }

listadoConductor(){
this.conductorService.listarconductor().subscribe({
 next:(res) =>{
  this.dataSource = new MatTableDataSource(res);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
 },
error: console.log
});
}

eliminarConductor(codigo:string){
  this.conductorService.eliminarConductor(codigo).subscribe(
    c =>{
      Swal.fire({icon:'info',title:'Resultado del registro', text: c.mensaje})
      this.listadoConductor();
    }
  );
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}
