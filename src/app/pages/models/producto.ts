import { TipoProducto } from "../../../enums/app.enums";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock : number;
    imagen: string;
    clasificacion: string;
    tipoProducto: TipoProducto;
}
