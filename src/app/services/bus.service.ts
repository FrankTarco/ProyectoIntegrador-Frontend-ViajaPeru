import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model';
import { AppSettings } from '../app.settings';

const url = AppSettings.API_ENDPOINT+'/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http:HttpClient) { }

  listarBuses():Observable<Bus[]>{
    return this.http.get<Bus[]>(url)
  }

  registrarBus(objBus:Bus):Observable<any>{
    return this.http.post(url,objBus);
  }

  actualizarBus(objBus:Bus):Observable<any>{
    return this.http.put(url,objBus);
  }

  eliminarBus(codigo:number):Observable<any>{
    return this.http.delete(url+'/'+codigo)
  }
}
