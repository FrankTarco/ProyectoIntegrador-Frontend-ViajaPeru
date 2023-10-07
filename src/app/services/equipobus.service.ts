import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { Conductor } from '../models/conductor.model';
import { Terramoza } from '../models/terramoza.model';
import { Equipobus } from '../models/equipobus.model';

const url = AppSettings.API_ENDPOINT + '/equipobus'

@Injectable({
  providedIn: 'root'
})
export class EquipobusService {

  constructor(private http:HttpClient) { }

  listarConductoresDisponibles():Observable<Conductor[]>{

    return this.http.get<Conductor[]>(url+'/conductores')
  }

  listarCopilotosDisponibles(codigo:string):Observable<Conductor[]>{

    return this.http.get<Conductor[]>(url+'/copilotos/'+codigo)
  }

  listarTerramozas():Observable<Terramoza[]>{

    return this.http.get<Terramoza[]>(url+'/terramozas')
  }

  registrarEquipoBus(obj:Equipobus):Observable<any>{
    return this.http.post(url,obj)
  }

  listarEquipos():Observable<Equipobus[]>{
    return this.http.get<Equipobus[]>(url)
  }

}
