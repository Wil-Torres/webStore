import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface objeto {
  id: number;
  descripcion: string;
}
interface movimiento {
  id: number;
  descripcion: string;
  fecha: Date;
  documento: string;
  detalle: any[];
}

@Injectable({
  providedIn: 'root'
})
export class WebstoreService {
  objCollection: AngularFirestoreCollection<objeto>;
  movCollection: AngularFirestoreCollection<movimiento>;
  marcas: Observable<objeto[]>;
  categorias: Observable<objeto[]>
  medidas: Observable<objeto[]>
  entradas: Observable<movimiento[]>
  salidas: Observable<movimiento[]>
  constructor(private afs: AngularFirestore) { }
  getMarcas() {
    this.objCollection = this.afs.collection('marcas');
    this.marcas = this.objCollection.valueChanges();
    return this.marcas;
  }
  addMarcas(obj) {
    this.afs.collection('marcas').doc(obj.descripcion).set({
      id: obj.id,
      descripcion: obj.descripcion
    });
  }
  getCategorias() {
    this.objCollection = this.afs.collection('categorias');
    this.categorias = this.objCollection.valueChanges();
    return this.categorias;
  }
  addCategorias(obj) {
    this.afs.collection('categorias').doc(obj.descripcion).set({
      id: obj.id,
      descripcion: obj.descripcion
    });
  }
  getMedidas() {
    this.objCollection = this.afs.collection('medidas');
    this.medidas = this.objCollection.valueChanges();
    return this.medidas;
  }
  addMedidas(obj) {
    this.afs.collection('medidas').doc(obj.descripcion).set({
      id: obj.id,
      descripcion: obj.descripcion
    });
  }
  getProductos() {
    this.objCollection = this.afs.collection('productos');
    this.medidas = this.objCollection.valueChanges();
    return this.medidas;
  }
  addProducto(obj) {
    console.log(obj)
    this.afs.collection('productos').doc(obj.descripcion).set({
      id: obj.id,
      descripcion: obj.descripcion,
      precio: obj.precio,
      idCategoria: obj.idCategoria,
      idMarca: obj.idMarca,
      idMedida: obj.idMedida,
    });
  }
  getEntradas() {
    this.movCollection = this.afs.collection('entradas');
    this.entradas = this.movCollection.valueChanges();
    return this.entradas;
  }
  addEntrada(obj) {
    console.log(obj)
    this.afs.collection('entradas').doc(obj.id.toString()).set({
      id: obj.id,
      descripcion: obj.descripcion,
      fecha: obj.fecha,
      documento: obj.documento,
      detalle: obj.detalle
    });
  }
  getSalidas() {
    this.objCollection = this.afs.collection('salidas');
    this.salidas = this.movCollection.valueChanges();
    return this.salidas;
  }
  addSalida(obj) {
    console.log(obj)
    this.afs.collection('salidas').doc(obj.id.toString()).set({
      id: obj.id,
      descripcion: obj.descripcion,
      fecha: obj.fecha,
      documento: obj.documento,
      detalle: obj.detalle
    });
  }
  getMovimientos() {
    let objeto = []
    this.afs.collection('entradas').snapshotChanges().subscribe((item) => {
      item.forEach(elem => {
        let coleccion = elem.payload.doc;
        coleccion.ref.set({tipo: 'E'}, {merge: true})
        objeto.push(elem.payload.doc.data());
      });
    })
    this.afs.collection('salidas').snapshotChanges().subscribe(item => {
      item.forEach(elem => {
        elem.payload.doc.ref.set({tipo: 'S'}, {merge: true})
        objeto.push(elem.payload.doc.data());
      });
    })
    return objeto;
  }
}
