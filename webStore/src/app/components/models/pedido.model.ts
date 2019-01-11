export class Pedido {
    constructor (
        public confirmacionPago: object,
        public detalle: Array<object>,
        public estado: number,
        public fecha: Date,
        public monto: number,
        public pedidoNumero: string,
        public uidCompra?: string
    ) {}
}