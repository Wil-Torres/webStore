import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from '../../../../node_modules/rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css',]
})
export class ProductosComponent implements OnInit {
  categorias: Observable<any[]>;
  marcas: Observable<any[]>;
  medidas: Observable<any[]>;
  objeto: any = {};
  objReview: any = {};
  objProducto: any = {
    "id": "#21457832",
    "nombre": "Reebok Royal CL Jogger 2",
    "descripcion": "Productos de primera calidad, unicos en guatemala, fabricados en Mixco",
    "precio": "68.00",
    "descuento": "30",
    "precioReal": "47.60",
    "rating":"4",
    "tamanio":[11,11.5,10,10.5,9,8,7,6],
    "colores": ["White/Red/Blue","Black/Orange/Green","Gray/Purple/White"],
    "cantidad": [1,2,3,4,5],
    "categorias": ["Men’s shoes", "Snickers", "Sport shoes"],
    "imagenes": [
      {
        "img": "https://firebasestorage.googleapis.com/v0/b/webstore-b37c1.appspot.com/o/test%2F1535572521433_SYNQ.png?alt=media&token=fe366b80-2161-454e-af7a-cdb3b0f2c526"
      }, {
        "img": "https://firebasestorage.googleapis.com/v0/b/webstore-b37c1.appspot.com/o/test%2F1535572521436_tigre.jpg?alt=media&token=799dbe87-7eb8-4cd0-aece-3985c7b9db22"
      }, {
        "img": "https://firebasestorage.googleapis.com/v0/b/webstore-b37c1.appspot.com/o/test%2Fdog2.jpg?alt=media&token=d6d1a9a8-45e1-4e34-b250-f0f83724c458"
      }, {
        "img": "https://firebasestorage.googleapis.com/v0/b/webstore-b37c1.appspot.com/o/test%2Ffondo.jpg?alt=media&token=8ca42153-8793-49fe-9b8b-e1911737f2ea"
      }, {
        "img": "https://firebasestorage.googleapis.com/v0/b/webstore-b37c1.appspot.com/o/test%2Fpajaro.jpg?alt=media&token=b45093c3-d183-4db0-8832-571b80f8e657"
      }
    ],
    "preview": [
      {
        "name": "Francis Burton",
        "email": "",
        "subject": "Average quality for the price\n",
        "rating": "3",
        "review": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
      },
      {
        "name": "Maggie Scott",
        "email": "",
        "subject": "My husband love his new...",
        "rating": "5",
        "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
      },
      {
        "name": "Jacob Hammond",
        "email": "",
        "subject": "Soft, comfortable, quite durable",
        "rating": "3",
        "review": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"
      }
    ]
  };

  constructor( @Inject(DOCUMENT) private _document, private servicioMaestro: WebstoreService) { }

  ngOnInit() {
    this.categorias = this.servicioMaestro.getCategorias();
    this.marcas = this.servicioMaestro.getMarcas();
    this.medidas = this.servicioMaestro.getMedidas();

  }
  alCambiarMedida (item) {
    this.marcas.forEach((marca) => {
    })
  }
  guardar () {
    this.servicioMaestro.addProducto(this.objeto);
  }
  subirArchivo () {
    console.log(this._document.getElementsByName('myFile')[0])
        //this.servicioMaestro.setMultiMedia(document.getElementsByName('myFile')[0].files[0]);
  }
  guardarReview () {
    console.log(this.objReview);
    this.objProducto.preview.push(this.objReview);
    this.objReview = {};
  }

}
