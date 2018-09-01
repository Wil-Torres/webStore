import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebstoreProductosService } from '../../services/webstore-productos.service';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoEdicionComponent implements OnInit {
  objeto: any = {}
  productos: Observable<any[]>;
  private selectedId: string;
  

  constructor(private svProducto: WebstoreProductosService,  private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('hola xyz')
    this.route.params.subscribe( params => {
      let id = params['id'];
      this.svProducto.getProducto(id).subscribe( producto => {
        console.log(producto)
        this.objeto =  producto;
      });
    })
  }

  guardarProducto(){
    this.svProducto.addProducto(null, this.objeto).then(producto => {
      console.log(producto)
      
    }, err => {
      console.error(err)
    });

  }

}
