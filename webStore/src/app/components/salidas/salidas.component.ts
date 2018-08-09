import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  objeto: any = {
    detalle: []
  }
  salidas: Observable<any[]>;
  temporal: any = {};

  constructor( private movimientos: WebstoreService) { }

  ngOnInit() {

  }
  guardar(){
    this.movimientos.addSalida(this.objeto);
  }
  addDetalle () {
    this.objeto.detalle.push(this.temporal)
    this.temporal = {};
  }

}
