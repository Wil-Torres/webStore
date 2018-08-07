import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  objeto: any = {}
  marcas: Observable<any[]>;
  constructor(private serviceMarca: WebstoreService) { }

  ngOnInit() {
    this.marcas = this.serviceMarca.getMarcas();
  }
  guardar() {
    this.serviceMarca.addMarcas(this.objeto);
  }

}
