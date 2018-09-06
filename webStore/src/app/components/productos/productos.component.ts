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
  orden: number;
  compra: any = [];

  constructor( @Inject(DOCUMENT) private _document, private servicioMaestro: WebstoreService, private router: Router) { }

  ngOnInit() {
    this.orden = 0; // inicalizamos sin orden
    this.categorias = this.servicioMaestro.getCategorias();
    this.marcas = this.servicioMaestro.getMarcas();
    this.medidas = this.servicioMaestro.getMedidas();
    this.productos = this.servicioMaestro.getProductos(null, null, null);
    this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;

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
    this.router.navigate(['/preview', id]);
  }
  agregarACesta(item) {
    this.servicioMaestro.addItemCart(item).subscribe(res => {
      this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
    })
  }
  borrarCompra(item){
    this.servicioMaestro.removeItemCart(item).subscribe(res => {
      this.compra = (JSON.parse(localStorage.getItem('cartShop'))).carrito;
    })
  }
  procesarCompra () {
    this.router.navigate(['/procesar']);
  }

  /* Filtros */
  filtrarCategoria (item) {
    this.productos = this.servicioMaestro.getProductos(null, 1, item);
  }
  filtrarMarca (item) {
    this.productos = this.servicioMaestro.getProductos(null, 2, item);
  }
  limpiarFiltro () {
    this.productos = this.servicioMaestro.getProductos(null, null, null);
  }
  ordenarProductos (orden) {
    this.productos = this.servicioMaestro.getProductos(orden, null, null);
  }

}
