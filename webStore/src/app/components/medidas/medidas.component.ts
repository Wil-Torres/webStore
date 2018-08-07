import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css']
})
export class MedidasComponent implements OnInit {
  objeto: any = {}
  medidas: Observable<any[]>;

  constructor( private serviceMedida: WebstoreService) { }

  ngOnInit() {
    this.medidas = this.serviceMedida.getMedidas();
  }

  guardar () {
    alert('mensaje de Medidas')
    this.serviceMedida.addMedidas(this.objeto);
  }

}
