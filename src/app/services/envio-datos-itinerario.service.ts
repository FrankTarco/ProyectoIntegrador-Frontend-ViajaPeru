import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EnvioDatosItinerarioService {

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(newData: any) {
    this.dataSubject.next(newData);
  }

  getData() {
    return this.dataSubject.getValue();
  }

  constructor() { }
}
