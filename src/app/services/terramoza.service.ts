import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Terramoza } from '../models/terramoza.model';
import { Observable } from 'rxjs';

const url = AppSettings.API_ENDPOINT+'/terramoza';

@Injectable({
  providedIn: 'root'
})
export class TerramozaService {

  constructor(private http:HttpClient) { }

  
  listadoTerramozas():Observable<Terramoza[]>{
  
    return this.http.get<Terramoza[]>(url)
  }

  registrarTerramoza(objTerramoza:Terramoza):Observable<any>{
    return this.http.post(url,objTerramoza)
  }

  actualizarTerramoza(objTerramoza:Terramoza):Observable<any>{
    return this.http.put(url,objTerramoza)
  }
  
  eliminarTerramoza(codigo:string):Observable<any>{
    return this.http.delete(url+'/'+codigo)
  }
}

