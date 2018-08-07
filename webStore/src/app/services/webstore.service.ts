import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface objeto {
  id: number;
  descripcion: string;
}


@Injectable({
  providedIn: 'root'
})
export class WebstoreService {
  objCollection: AngularFirestoreCollection<objeto>;
  marcas: Observable<objeto[]>;
  categorias: Observable<objeto[]>
  medidas: Observable<objeto[]>
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
  

}
