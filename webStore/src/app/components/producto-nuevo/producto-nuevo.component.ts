import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebstoreProductosService } from '../../services/webstore-productos.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {
  objeto: any = {}
  productos: Observable<any[]>;
  

  constructor(private svProducto: WebstoreProductosService, private router: Router) { }

  ngOnInit() {
    this.productos = this.svProducto.getProductos();

  }

  guardarProducto(){
    this.svProducto.addProducto(null, this.objeto).then(producto => {
      this.router.navigate(['/edicionProducto', producto.id]);
    }, err => {
      console.error(err)
    });

  }

}
