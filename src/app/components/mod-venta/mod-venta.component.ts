import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js/auto';
import jsPDF from 'jspdf';
import { of, switchMap, tap } from 'rxjs';
import { InfoVentaComponent } from 'src/app/dialogs/info-venta/info-venta.component';
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


  public chart:Chart

  lstVentasChart:any=[]

  constructor(private transaccionService:TransaccionService,private utilService:UtilService, public dialog:MatDialog){}


  openDialog(data:any) {
    const dialogRef = this.dialog.open(InfoVentaComponent, {data,});
  }


  ngOnInit(): void {

    this.utilService.listarVentasGrafico()
    .pipe(
      tap(() => console.log("Entro al suscribe")),
      switchMap(x => {
        this.lstVentasChart = x;
        console.log("SE hizo todo el llamado http",this.lstVentasChart);
        return of(this.lstVentasChart);      
      })
    )
    .subscribe(() => {
      let primerosElementos:string[] = this.lstVentasChart.map(objecto=> objecto[0]);
      let segundo:number[] = this.lstVentasChart.map(objecto=> objecto[1])

      const data= {
        labels:primerosElementos,
        datasets:[{
          label: 'Ventas totales',
          data: segundo,
          fill: false,
          bordercolor: 'rgb(75, 192, 192)',
          backgroundColor: ['rgba(240, 0, 0, 0.774)', 'rgba(102, 102, 102, 0.966)'],
          tension: 0.1
        }
      ]
      };
  
      this.chart=new Chart("chart", {
        type: 'bar',
        data 
      })

    });

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


  descargar(){
    const imagelink = document.createElement('a')
    const canva = document.getElementById('chart') as HTMLCanvasElement

    imagelink.download = 'canvas.png'
    imagelink.href = canva.toDataURL('image/png',1)
    imagelink.click();
  }


  descargarpdf(){
    const canva = document.getElementById('chart') as HTMLCanvasElement
    const canvaimage = canva.toDataURL('image/jpeg',1.0)
    let pdf = new jsPDF('landscape');
    pdf.setFontSize(20);
    pdf.addImage(canvaimage, 'JPEG', 10, 10, 270, 130)
    pdf.save('mychart.pdf')

  }

}
