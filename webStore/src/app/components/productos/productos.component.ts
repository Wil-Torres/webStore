import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {
  categorias: Observable<any[]>;
  marcas: Observable<any[]>;
  medidas: Observable<any[]>;
  objeto: any = {};

  constructor( private servicioMaestro: WebstoreService) { }

  ngOnInit() {
    this.categorias = this.servicioMaestro.getCategorias();
    this.marcas = this.servicioMaestro.getMarcas();
    this.medidas = this.servicioMaestro.getMedidas();

  }
  alCambiarMedida (item) {
    console.log(this.marcas)
    this.marcas.forEach((marca) => {
      console.log(marca);
      
    })
    
  }
  guardar () {
    this.servicioMaestro.addProducto(this.objeto);
  }

}
