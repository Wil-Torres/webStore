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

}
