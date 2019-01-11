import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Marca } from '../../components/models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marca: Marca
  marcas: Observable<Marca[]>;
  marcasCollection: AngularFirestoreCollection<Marca>;
  constructor(private afs: AngularFirestore) { }

  getMarcas() {
    this.marcasCollection = this.afs.collection('marcas');
    this.marcas = this.marcasCollection.valueChanges();
    return this.marcas;
  }
  addMarcas(marca: Marca) {
    return this.afs.collection('marcas').add(marca);
  }
  removeMarca(marca: Marca){
    console.log(marca)
    return this.afs.collection('marcas').doc(marca.id).delete()
  }
  updateMarca (marca: Marca){
    console.log(marca)
    return this.afs.collection('marcas').doc(marca.id).update(marca)
  }

}
