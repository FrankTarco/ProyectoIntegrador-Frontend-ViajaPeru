import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditDestinoComponent } from 'src/app/dialogs/add-edit-destino/add-edit-destino.component';
import { DestinoService } from 'src/app/services/destino.service';
import Swal from 'sweetalert2';

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

  constructor(private destinoService:DestinoService,private dialog:MatDialog){}


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
      this.destinoService.eliminarDestino(codigo).subscribe(
        c =>{
          Swal.fire({icon:'info',title:'Resultado del registro', text: c.mensaje})
          this.listadoDestinos();
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
