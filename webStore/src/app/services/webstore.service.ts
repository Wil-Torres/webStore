import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Marca {
  id: number;
  descripcion: string;
}


@Injectable({
  providedIn: 'root'
})
export class WebstoreService {
  objCollection: AngularFirestoreCollection<Marca>;
  marcas: Observable<Marca[]>;
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

}
