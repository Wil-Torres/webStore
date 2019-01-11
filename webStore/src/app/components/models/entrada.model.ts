export class Entrada {
    constructor (
        public descripcion: string,
        public documento: string,
        public fecha: Date,
        public tipo: string,
        public id?: string,
        public detalle?: any,
    ) {}
}