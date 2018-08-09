import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  objeto: any = {
    detalle: []
  }
  entradas: Observable<any[]>;
  temporal: any = {};

  constructor( private movimientos: WebstoreService ) { }

  ngOnInit() {
  }
  guardar(){
    this.movimientos.addEntrada(this.objeto);
  }
  addDetalle () {
    this.objeto.detalle.push(this.temporal)
    this.temporal = {};
  }

}
