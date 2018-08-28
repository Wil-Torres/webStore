import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }
  iniciarSesion = (email: any, password:any) => {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.EmailAuthProvider();
      this.afAuth.auth
      .signInWithEmailAndPassword(email, password).then( res => {
        resolve(res.user)
      }, err => {
        reject(err.message);
      });
    });

  }
}
