import { firestore } from "firebase";

export type CollectionReference = firestore.CollectionReference;

export interface Estado {
    codigo: Number;
    descripcion: String;
    id: String;
}

export interface Marca {
    id: String;
    codigo: Number;
    descripcion: String;
}

export interface Medida {
    id: String;
    codigo: Number;
    descripcion: String;
}

export interface Otro {
    id: String;
    codigo: Number;
    nombre: String;
    estado: CollectionReference;
    medida: CollectionReference;
}