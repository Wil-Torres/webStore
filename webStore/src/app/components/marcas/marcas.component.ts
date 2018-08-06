import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  cod: number = 0;
  desc: string = '';
  marcas: Observable<any[]>;
  constructor(private serviceMarca: WebstoreService) {}

  ngOnInit() {
    this.marcas = this.serviceMarca.getMarcas();
  }
  guardar () {
    let objetoMarca = {
      descripcion: this.desc,
      id: this.cod
    }
    alert(this.cod + ' - ' + this.desc) ;
    this.serviceMarca.addMarcas(objetoMarca);

  }

}
