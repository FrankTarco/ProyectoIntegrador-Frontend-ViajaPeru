import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pago } from 'src/app/models/pago.model';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-mod-venta',
  templateUrl: './mod-venta.component.html',
  styleUrls: ['./mod-venta.component.css']
})
export class ModVentaComponent implements OnInit{


  displayedColumns: string[] = ['Venta', 'Fecha', 'Origen', 'Destino', 'Cliente', 'Servicio', 'Precio','Info'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  lstVentas:Object[]=[]

  constructor(private transaccionService:TransaccionService,private utilService:UtilService){

    utilService.listarVentasGrafico().subscribe(
      x => {
        this.lstVentas = x
        console.log(this.lstVentas)
      }
    )
  }

  ngOnInit(): void {
    this.listadoPagos()
  }


  listadoPagos(){
    this.transaccionService.listarPagos().subscribe({
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
