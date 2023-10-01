import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Combustible } from '../models/combustible.model';
import { Servicio } from '../models/servicio.model';
import { TipoDocumento } from '../models/tipo-documento.model';
import { Licencia } from '../models/licencia.model';

const url = AppSettings.API_ENDPOINT+'/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listarCombustibles():Observable<Combustible[]>{
    return this.http.get<Combustible[]>(url+'/lista/combustible')
  }

  listarServicios():Observable<Servicio[]>{
    return this.http.get<Combustible[]>(url+'/lista/servicio')
  }


  listarTiopoDocumento():Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(url+'/lista/tipodoc')
  }

  listarLicencia():Observable<Licencia[]>{
    return this.http.get<Licencia[]>(url+'/lista/licencia')
  }

}
