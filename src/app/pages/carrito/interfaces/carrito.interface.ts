import { ItemCarrito } from "./item-carrito.interface";

export interface Carrito {
    id: number;
    id_usuario: number;
    items: ItemCarrito[];
}

