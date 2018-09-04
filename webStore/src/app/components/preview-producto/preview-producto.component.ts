import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebstoreProductosService } from '../../services/webstore-productos.service';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-preview-producto',
  templateUrl: './preview-producto.component.html',
  styleUrls: ['./preview-producto.component.css']
})
export class PreviewProductoComponent implements OnInit {
  objProducto: any = {}
  path: string = '';
  productos: Observable<any[]>;
  objReview: any = {};
  private selectedId: string;

  constructor(private svProducto: WebstoreProductosService,  private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('hola xyz')
    this.route.params.subscribe( params => {
      let id = params['id'];
      this.path = id;
      this.svProducto.getProducto(id).subscribe( producto => {
        console.log(producto)
        this.objProducto =  producto;
      });
    })
    
  }
  guardarReview () {
    console.log(this.objReview);
    if (!this.objProducto.preview){
      this.objProducto.preview = [];
    }
    this.objProducto.preview.push(this.objReview);
    this.objReview = {};
    this.svProducto.saveProducto(this.path, this.objProducto).then(res => {
      console.log("producto actualizado");
    }, err => {
      console.error(err)
    })
  }

}
