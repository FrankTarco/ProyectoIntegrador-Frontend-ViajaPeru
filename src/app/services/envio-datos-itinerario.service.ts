import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioDatosItinerarioService {

  private envioDatosSubject = new Subject<any>();

  envioDatos$ = this.envioDatosSubject.asObservable();

  enviarDatos(data:any){
    this.envioDatosSubject.next(data);
  }

  constructor() { }
}
