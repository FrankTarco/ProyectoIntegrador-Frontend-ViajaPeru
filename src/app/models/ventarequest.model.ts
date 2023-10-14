import { Boleto } from "./boleto.model";
import { Cliente } from "./cliente.model";
import { Pago } from "./pago.model";
import { Pasajero } from "./pasajero.model";
import { Ventaboleto } from "./ventaboleto.model";

export class Ventarequest {

    ventaBoleto?:Ventaboleto;
    pasajeros?:Pasajero[];
    boletos?:Boleto[];
    cliente?:Cliente;
    pago?:Pago;

}
