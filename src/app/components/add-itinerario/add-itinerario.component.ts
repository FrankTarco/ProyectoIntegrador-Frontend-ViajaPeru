import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditItinerarioComponent } from 'src/app/dialogs/add-edit-itinerario/add-edit-itinerario.component';
import { Equipobus } from 'src/app/models/equipobus.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { EquipobusService } from 'src/app/services/equipobus.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-itinerario',
  templateUrl: './add-itinerario.component.html',
  styleUrls: ['./add-itinerario.component.css']
})
export class AddItinerarioComponent {

  displayedColumns: string[] = ['codigo', 'Salida', 'Llegada', 'Origen', 'Destino', 'Bus','Precio','estado','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private equipoBus:EquipobusService,private itinerarioService:ItinerarioService,private dialog:MatDialog){

  }

openDialog(){
  const dialogRef = this.dialog.open(AddEditItinerarioComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.listadoItinerarios();
      }
    },
  });
}

openEditDialog(data:any) {
  const dialogRef = this.dialog.open(AddEditItinerarioComponent, {data,});
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.listadoItinerarios();
      }
    },
  });
}


ngOnInit(): void {
  this.listadoItinerarios();
}

listadoItinerarios(){
  this.itinerarioService.listarItinerario().subscribe({
    next: (res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: console.log
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

eliminarBus(codigo:string){  
  this.itinerarioService.eliminarItinerario(codigo).subscribe({
    next: (rest) =>{
      Swal.fire({icon:'info',title:'Resultado de la eliminacion', text: rest.mensaje});
      this.listadoItinerarios();
    },
    error: console.log,
  });
}

}

