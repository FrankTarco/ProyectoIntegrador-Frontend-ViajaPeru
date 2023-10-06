import { Conductor } from "./conductor.model";
import { Terramoza } from "./terramoza.model";

export class Equipobus {

    cod_equipo?:string;
    codchofer?:string;
    codcopiloto?:string;
    codterramoza?:string;
    estado?:number;
    objConductor?:Conductor;
    objTerramoza?:Terramoza;
    objCopiloto?:Conductor;
}
