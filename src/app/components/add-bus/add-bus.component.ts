import { AfterViewInit, Component,OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BusService } from 'src/app/services/bus.service';
import { Bus } from 'src/app/models/bus.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBusComponent } from 'src/app/dialogs/add-edit-bus/add-edit-bus.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css'],
})


export class AddBusComponent implements OnInit{

  displayedColumns: string[] = ['codigo', 'asientos', 'placa', 'año', 'servicio', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private busService:BusService,public dialog:MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditBusComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.listadoEmpleados();
        }
      },
    });
  }

  openEditDialog(data:any) {
    const dialogRef = this.dialog.open(AddEditBusComponent, {data,});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.listadoEmpleados();
        }
      },
    });
  }


  ngOnInit(): void {
    this.listadoEmpleados();
  }

  listadoEmpleados(){
    this.busService.listarBuses().subscribe({
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

  eliminarBus(codigo:number){  
  
    Swal.fire({
      icon:'warning',
      title:'¿Estas seguro?', 
      text: 'Eliminar el Bus '+codigo,
      showCancelButton:true,
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6',
      confirmButtonText:'Si eliminar'
      }).then((result) => {
        if (result.isConfirmed){
          this.busService.eliminarBus(codigo).subscribe(
            x => {
              if(x.mensaje.includes("Error")){
                Swal.fire({icon:'error',title:'Resultado', text: x.mensaje});
              }
              else{
                Swal.fire({icon:'success',title:'Resultado', text: x.mensaje});
                this.listadoEmpleados();
              }             
            }
          )
          
        }
      })  ;
  }


}

