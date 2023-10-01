import { Licencia } from "./licencia.model";
import { TipoDocumento } from "./tipodocumento.model";


export class Conductor {


    cod_conductor?:string;
	cod_tipodocumento?:number;
	nrodocumento?:string;
	ape_chofer?:string;
	nom_chofer?:string;
	cod_licencia?:number;
	nrolicencia?:string;
	telefono?:string;

	objTipoDocumento?:TipoDocumento;
	objLicencia?:Licencia;


}
