import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { Ventarequest } from '../models/ventarequest.model';
import { Cliente } from '../models/cliente.model';
import { Pago } from '../models/pago.model';

const url = AppSettings.API_ENDPOINT + '/transaccion'

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private http:HttpClient) { }

  registrarTransaccion(obj:Ventarequest):Observable<any>{
    return this.http.post(url,obj)
  }

  generarListaPdf(){
    return this.http.get(url+'/export',{responseType:'blob'})
  }

  enviarCorreo(correo:string){
    return this.http.get(url+'/email/'+correo)
  }

  generarFacturaPdf(){
    return this.http.get(url+'/export/factura',{responseType:'blob'})
  }

  enviarFacturaCorreo(correo:string){
    return this.http.get(url+'/email/factura/'+correo)
  }

  encontrarCliente(documento:string):Observable<Cliente>{
    return this.http.get(url+'/cliente/'+documento)
  }

  listarPagos():Observable<Pago[]>{
    return this.http.get<Pago[]>(url+"/lista/pagos")
  }

}
