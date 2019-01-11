export class Categoria {
    constructor(
        public descripcion: string,
        public id?: string,
        public subCategorias?: object
    ){}
}