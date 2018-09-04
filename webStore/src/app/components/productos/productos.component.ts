import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from '../../../../node_modules/rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css',]
})
export class ProductosComponent implements OnInit {
  categorias: Observable<any[]>;
  marcas: Observable<any[]>;
  medidas: Observable<any[]>;
  productos: Observable<any[]>;
  objeto: any = {};

  constructor( @Inject(DOCUMENT) private _document, private servicioMaestro: WebstoreService, private router: Router) { }

  ngOnInit() {
    this.categorias = this.servicioMaestro.getCategorias();
    this.marcas = this.servicioMaestro.getMarcas();
    this.medidas = this.servicioMaestro.getMedidas();
    this.productos = this.servicioMaestro.getProductos();

  }
  alCambiarMedida (item) {
    this.marcas.forEach((marca) => {
    })
  }
  guardar () {
    this.servicioMaestro.addProducto(this.objeto);
  }
  removeProducto (key) {
    this.servicioMaestro.removeProducto(key)
  }
  preview(id) {
    this.router.navigate(['/preview', '5uryffoGwj0ePibqCExs']);
  }
  agregarACesta() {
    alert('en construccion');
  }
}
