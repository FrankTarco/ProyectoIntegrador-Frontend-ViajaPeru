import { TipoDocumento } from "./tipodocumento.model";

export class Cliente {

    cod_cliente?:string;
    nombre?:string;
    cod_tipodocumento?:number;
    numeroDocumento?:string;
    email?:string;
    telefono?:string;
    direccion?:string;
    objTipoDocumento?:TipoDocumento;
    

}
