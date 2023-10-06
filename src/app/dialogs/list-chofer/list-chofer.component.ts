import { Component,ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquipobusService } from 'src/app/services/equipobus.service';

@Component({
  selector: 'app-list-chofer',
  templateUrl: './list-chofer.component.html',
  styleUrls: ['./list-chofer.component.css']
})
export class ListChoferComponent {

  displayedColumns: string[] = ['codigo', 'documento', 'nombre', 'tipolicencia','enviarDatos'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private equipoBusService:EquipobusService,public dialogRef:MatDialogRef<ListChoferComponent>){

  equipoBusService.listarConductoresDisponibles().subscribe(
    x=> {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  );

}

enviarDatos(data:any){
  this.dialogRef.close(data)
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
