import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private servicio: AuthService) { }
  objeto : any = {};

  ngOnInit() {
  }
  ingresar = () => {
    this.servicio.iniciarSesion(this.objeto.user, this.objeto.password).then( res => {
      if ( res ){
        let usuario = {
          email: res.email, 
          displayName: res.displayName, 
          logeado: true, 
        }
        console.log(res);
        window.localStorage.setItem('appLogeado', JSON.stringify(usuario));
        location.reload();
      }
    }).catch(err => {
      alert(err);
    })
  }

}
