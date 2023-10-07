import { Bus } from "./bus.model";
import { Destino } from "./destino.model";
import { Equipobus } from "./equipobus.model";

export class Itinerario {

    cod_itinerario?:string;
    fecha_salida?:string;
    fecha_llegada?:string;
    codorigen?:string;
    codllegada?:string;
    codequipo?:string;
    codbus?:string;
    precio?:number;
    estado?:number;

    objOrigen?:Destino;
    objLlegada?:Destino;
    objEquipobus?:Equipobus;
    objBus?:Bus;

}
