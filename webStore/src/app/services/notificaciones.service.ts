import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private toastr: ToastrService) {
  }

  notificar (op, cnf) {
    cnf = cnf || {
      positionClass: 'toast-bottom-center'
    };
    return this.toastr.show(op.msj, op.titulo, cnf);
  }

  info (msj, titulo = null, cnf = null) {
    cnf = cnf || {
      positionClass: 'toast-bottom-center'
    };
    return this.toastr.info(msj, titulo, cnf);
  };
  error (msj, titulo = null, cnf = null) {
    cnf = cnf || {
      positionClass: 'toast-bottom-center'
    };
    return this.toastr.error(msj, titulo, cnf);
  };
  success (msj, titulo = null, cnf = null) {
    cnf = cnf || {
      positionClass: 'toast-bottom-center'
    };
    return this.toastr.success(msj, titulo, cnf);
  };
  warning (msj, titulo = null, cnf = null) {
    cnf = cnf || {
      positionClass: 'toast-bottom-center'
    };
    return this.toastr.warning(msj, titulo, cnf);
  };
  
  

}
