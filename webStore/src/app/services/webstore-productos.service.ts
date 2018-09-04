import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface objeto { };

@Injectable({
  providedIn: 'root'
})
export class WebstoreProductosService {
  objCollection: AngularFirestoreCollection<objeto>;
  objOb: any = [];
  productos: any = {};

  constructor(private afs: AngularFirestore) { }
  getIndice() {
    return this.afs.createId();
  }
  getProductos() {
    this.objCollection = this.afs.collection('productos');
    this.productos = this.objCollection.valueChanges();
    return this.productos;
  }
  getProducto(id) {
    /*this.objCollection = this.afs.collection('productos') */
    
    this.objCollection = this.afs.collection<objeto>('productos');
    let x = this.objCollection.snapshotChanges();
    x.forEach(producto => {
      producto.forEach( prod =>{
          let data = prod.payload.doc.data();
          let id = prod.payload.doc.id;
          data['id'] = id;
          console.log( "ID: ", id, " Data: " , data );
          });
    })
    return this.objCollection.doc(id).valueChanges();
    
  }
  addProducto(indice, obj) {
    //return this.afs.collection('productos').doc(indice).set(obj);
    return this.afs.collection('productos').add(obj)
  }
  saveProducto(indice, obj) {
    //return this.afs.collection('productos').doc(indice).set(obj);
    return this.afs.collection('productos').doc(indice).update(obj);
  }
}
