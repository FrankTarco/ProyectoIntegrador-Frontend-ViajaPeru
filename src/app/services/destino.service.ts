import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino } from '../models/destino.model';
import { Observable } from 'rxjs';

const urlBase = "http://localhost:8090/rest/destino";

@Injectable({
  providedIn: 'root'
})

export class DestinoService {

  constructor(private http:HttpClient) { }

  listadoDestinos():Observable<any>{
    return this.http.get<Destino[]>(urlBase);
  }

}
