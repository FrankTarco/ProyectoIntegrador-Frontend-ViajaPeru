import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

const url = AppSettings.API_ENDPOINT + '/itinerario'

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor() { }
}
