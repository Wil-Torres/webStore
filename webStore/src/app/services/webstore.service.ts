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
  productos: Observable<objeto[]>
  entradas: Observable<movimiento[]>
  salidas: Observable<movimiento[]>
  contenedor: any = {};

  constructor(private afs: AngularFirestore) {

  }
  escuchaCarrito(item, accion): Observable<{}> {
    let obs = new Observable(observer => {
      let contador = 0;
      let contenedor = JSON.parse(localStorage.getItem('cartShop'));
      if (accion === 'A') { // Agregar al carrito
        if (!contenedor.carrito) {
          contenedor.carrito = [];
        } else {
          let x = contenedor.carrito.findIndex(elem => {
            return elem.id === item.id
          });
          if( typeof x !== undefined && x >= 0){
            contenedor.carrito[x].cantidad += item.cantidad;
            contenedor.carrito[x].subTotal = contenedor.carrito[x].precio * contenedor.carrito[x].cantidad
            contenedor.carrito[x].desc = (contenedor.carrito[x].descuento * contenedor.carrito[x].subTotal) / 100
            contenedor.carrito[x].total = contenedor.carrito[x].subTotal - contenedor.carrito[x].desc;
          }else{
            item.subTotal = item.precio * item.cantidad;
            item.desc = item.descuento * item.subTotal / 100;
            item.total = item.subTotal - item.desc;
            contenedor.carrito.push(item);
          }
          
        }
      }else if ( accion === 'B'){ // Borrar del carrito
        console.log('aqui')
        contenedor.carrito.splice(item, 1)
      }
      localStorage.setItem('cartShop', JSON.stringify(contenedor));
      let intervalo = setInterval(() => {
        contador += 1;
        observer.next(contenedor)
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000)

    });
    return obs;
  }
  addItemCart(item) {
    return this.escuchaCarrito(item, 'A')
  }
  removeItemCart(item) {
    return this.escuchaCarrito(item, 'B')
  }
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
  getProductos(orden, param, value) {
    this.objCollection = this.afs.collection('productos', ref => {
      let query: firebase.firestore.Query = ref
      switch (param) {
        case 1:
          query = query.where('categorias', 'array-contains', value);
          break;
        case 2:
          query = query.where('marca', '>=', value);
          break;
      }
      switch (orden) {
        case 1:
          query = query.orderBy("precio", "asc");
          break;
        case 2:
          query = query.orderBy('precio', 'desc');
          break;
        case 3:
          query = query.orderBy('rating');
          break;
        case 4:
          query = query.orderBy('nombre', 'asc');
          break;
        case 4:
          query = query.orderBy('nombre', 'desc');
          break;
      }
      return query;
    });
    this.productos = this.objCollection.valueChanges();
    return this.productos;
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
  removeProducto(key) {
    console.log(key)
    this.afs.collection('productos').doc(key).delete().then(res => {
      console.log(res)
    }, err => {
      console.error(err);
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
        coleccion.ref.set({ tipo: 'E' }, { merge: true })
        elem.payload.doc.data()['detalle'].forEach(element => {
          let data = coleccion.data();
          objeto.push({
            descripcion: data['descripcion'],
            documento: data['documento'],
            fecha: data['fecha'],
            id: data['id'],
            tipo: data['tipo'],
            idProducto: element.idProducto,
            precio: element.precio,
            cantidad: element.cantidad,
            valorUnitario: element.valorUnitario,
            valorTotal: (element.precio * element.cantidad),
            cantidadTotal: function (indice1, indice2) {
              console.log(indice1, indice2);
              if (indice1 === 0) {
                return (objeto[indice1].cantidad + 0)
              } else {
                if (objeto[indice1].tipo === 'S') {
                  return (objeto[indice2].cantidad - objeto[indice1].cantidad)
                } else {
                  return (objeto[indice2].cantidad + objeto[indice1].cantidad)
                }
              }

            }
          });
        });
      });
      console.log(objeto);
    })
    this.afs.collection('salidas').snapshotChanges().subscribe(item => {
      item.forEach(elem => {
        let coleccion = elem.payload.doc;
        coleccion.ref.set({ tipo: 'S' }, { merge: true })
        elem.payload.doc.data()['detalle'].forEach(element => {
          let data = coleccion.data();
          objeto.push({
            descripcion: data['descripcion'],
            documento: data['documento'],
            fecha: data['fecha'],
            id: data['id'],
            tipo: data['tipo'],
            idProducto: element.idProducto,
            precio: element.precio,
            cantidad: element.cantidad,
            valorUnitario: element.valorUnitario,
            valorTotal: (element.precio * element.cantidad),
            cantidadTotal: function (indice1, indice2) {
              console.log(indice1, indice2);
              if (indice1 === 0) {
                return (objeto[indice1].cantidad + 0)
              } else {
                if (objeto[indice1].tipo === 'S') {
                  return (objeto[indice2].cantidad - objeto[indice1].cantidad)
                } else {
                  return (objeto[indice2].cantidad + objeto[indice1].cantidad)
                }
              }
            }
          });
        });
      });
    })
    return objeto;
  }
  getLogin(email: any, contrasenia: any) {
    firebase.auth().signInWithEmailAndPassword(email, contrasenia).catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log('deslogeado');
        // ...
      }
    });

  }
  /*setMultiMedia(archivo) {
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child(archivo.name).put(archivo);
    spaceRef.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;
            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
        }
    }, function () {
        // Upload completed successfully, now we can get the download URL
        spaceRef.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
        });
    });



  }*/
}
