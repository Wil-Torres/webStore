import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  objeto: any = {
    id: 0,
    descripcion: null
  };
  categorias: Observable<any[]>;

  constructor(private serviceCategoria: WebstoreService) { }

  ngOnInit() {
    this.categorias = this.serviceCategoria.getCategorias();
  }
  guardar () {
    let objetoCategoria = this.objeto
    this.serviceCategoria.addCategorias(objetoCategoria);
  }

}
