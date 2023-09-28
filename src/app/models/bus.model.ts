import { Combustible } from "./combustible.model";
import { Servicio } from "./servicio.model";

export class Bus {

    cod_bus?:string;
	placa?:string;
	marca?:string;
	total_asientos?:number;
	total_pasajeros?:number;
	año_fabricacion?:string;
	cantidad_ruedas?:number;
	cod_combustible?:number;
	cod_servicio?:number;

    objCombustible?:Combustible;
    objServicio?:Servicio;

}
