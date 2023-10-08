import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Itinerario } from '../models/itinerario.model';
import { Observable } from 'rxjs';

const url = AppSettings.API_ENDPOINT + '/itinerario'

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(private http:HttpClient) { }

  registrarItinerario(obj:Itinerario):Observable<any>{
    return this.http.post(url,obj)
  }

  listarItinerario():Observable<Itinerario[]>{
    return this.http.get<Itinerario[]>(url)
  }

  actualizarItinerario(obj:Itinerario):Observable<any>{
    return this.http.put(url,obj)
  }

  eliminarItinerario(codigo:string):Observable<any>{
    return this.http.delete(url+'/'+codigo)
  }


}
