import { Pasajero } from "./pasajero.model";
import { Ventaboleto } from "./ventaboleto.model";

export class Boleto {

    cod_boleto?:string;
    numero_asiento?:number;
    precio?:number;
    cod_pasajero?:string;
    cod_venta?:string;

    pasajero?:Pasajero;
    venta?:Ventaboleto;

}
