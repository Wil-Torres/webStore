import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {
  salidas: Observable<any[]>;
  entradas: Observable<any[]>;

  constructor( private movimientos: WebstoreService) { }

  ngOnInit() {
    this.salidas = this.movimientos.getSalidas();
    this.entradas = this.movimientos.getEntradas();
    this.entradas.forEach(element => {
      console.log(element);
    });
  }

}
