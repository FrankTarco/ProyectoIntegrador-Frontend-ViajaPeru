import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino } from '../models/destino.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const urlBase = AppSettings.API_ENDPOINT+'/destino';

@Injectable({
  providedIn: 'root'
})

export class DestinoService {

  constructor(private http:HttpClient) { }

  listadoDestinos():Observable<any>{
    return this.http.get<Destino[]>(urlBase)
  }

  listadoDestinosDiferente(destino:string):Observable<Destino[]>{
    return this.http.get<Destino[]>(urlBase+"/buscarDiferente/"+destino)
  }
  
  registrarDestino(objDestino:Destino):Observable<any>{
    return this.http.post(urlBase,objDestino)
  }

  
  actualizarDestino(objDestino:Destino):Observable<any>{
    return this.http.put(urlBase,objDestino)
  }

  eliminarDestino(codigo:string):Observable<any>{
    return this.http.delete(urlBase+'/'+codigo)
  }
}
