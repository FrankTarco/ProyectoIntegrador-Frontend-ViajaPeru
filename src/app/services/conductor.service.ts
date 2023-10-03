import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conductor } from '../models/conductor.model';

const url = AppSettings.API_ENDPOINT+'/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http:HttpClient) { }

  listarconductor():Observable<Conductor[]>{

    return this.http.get<Conductor[]>(url)

  }

registraConductor (obj:Conductor):Observable<any>{

  return this.http.post(url,obj);
}


actualizarConductor(obj:Conductor):Observable<any>{
  return this.http.put(url,obj)
}

eliminarConductor(codigo:string):Observable<any>{
  return this.http.delete(url+'/'+codigo)
}

}
