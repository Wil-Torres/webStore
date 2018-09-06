import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  title = 'app';
  ajustes: Ajustes = {
    logeado: false,
    email: null,
    displayName: null
  }

  constructor(private fb: FormBuilder, private af: AngularFireDatabase) {
    this.createForm();
    this.cargarAjustes()
    if ( !localStorage.getItem('cartShop') ){
      window.localStorage.setItem('cartShop', JSON.stringify({carrito: []}));
    }
  }
  cargarAjustes () {
    console.log('cargando ajustes');
    if ( localStorage.getItem('appLogeado') ){
      this.ajustes = JSON.parse(localStorage.getItem('appLogeado'));
    }else{
      console.log('usando valores por default');
    }
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  onSubmit() {
    const {name, email, message} = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, message, date, html };
    this.af.database.refFromURL('/messages').push(formRequest);
    this.form.reset();
  }
}
interface Ajustes {
  logeado: boolean,
  email: String,
  displayName: String

}