import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  constructor(private spinnerService:SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url===(AppSettings.API_ENDPOINT+'/transaccion')){
      console.log("Ingresando al interceptor" + req);
      this.spinnerService.show()
      return next.handle(req).pipe(finalize(() => this.spinnerService.hide()))     
    }
    return next.handle(req) 
  }
}
