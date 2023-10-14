import { Cliente } from "./cliente.model";
import { Ventaboleto } from "./ventaboleto.model";

export class Pago {

    cod_pago?:string;
    numero_tarjeta?:string;
    fecha_operacion?:string;
    cod_venta?:string;
    cod_cliente?:string;

    venta?:Ventaboleto;
    cliente?:Cliente;

}
