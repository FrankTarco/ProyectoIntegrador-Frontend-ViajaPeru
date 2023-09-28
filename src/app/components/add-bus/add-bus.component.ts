import { AfterViewInit, Component,OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BusService } from 'src/app/services/bus.service';
import { Bus } from 'src/app/models/bus.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBusComponent } from 'src/app/dialogs/add-edit-bus/add-edit-bus.component';


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
    this.dialog.open(AddEditBusComponent);
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

  
}

