export class Producto {
    constructor( 
        public categorias: Array<string>,
        public codigoProducto: string,
        public color: string,
        public descripcion: string,
        public descuento: number,
        public nombre: string,
        public precio: number,
        public id?: string,
        public imagenes?: Array<string>,
        public rating?:string,
        public talla?: string
    ) {
    }
}