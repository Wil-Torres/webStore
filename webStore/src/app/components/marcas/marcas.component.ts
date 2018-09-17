import { Component, OnInit } from '@angular/core';
import { WebstoreService } from '../../services/webstore.service';
import { Observable } from 'rxjs';
import { NotificacionesService } from '../../services/notificaciones.service';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  objeto: any = {}
  marcas: Observable<any[]>;
  constructor(private serviceMarca: WebstoreService, private notify: NotificacionesService) { }

  ngOnInit() {
    this.marcas = this.serviceMarca.getMarcas();
    this.serviceMarca.getProducto();
  }
  guardar() {
    console.log(this.objeto)
    if(!this.objeto.codigo || !this.objeto.descripcion || this.objeto.codigo === null || this.objeto.descripcion === null){
      this.notify.error('Falta informacion, verificar datos.');
      return;
    }
    this.serviceMarca.addMarcas(this.objeto).then(marca => {
      marca.update({ id: marca.id }).then(actualizado => {
        this.notify.success(`Marca ${this.objeto.descripcion} creada`);
      })
    });
  }
  removeMarca (obj) {
    this.serviceMarca.removeMarca(obj).then(marca => {
      this.notify.success(`Marca ${obj.descripcion} eliminada`);
    }, err => {
      this.notify.error(err);
    })
  }

}
