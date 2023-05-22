import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  initAuthListener() {

    this.auth.onAuthStateChanged(user => {
      console.log(user?.email);
      console.log(user?.uid);
    })

  }
  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(): Promise<any> {
    return this.auth.signOut();
  }
  isAuth() {
    // let user= this.auth.onAuthStateChanged.subscribe().pipe(map(fbUser => fbUser != null))
    return authState(this.auth).pipe(
      map((firebaseUser) => firebaseUser !== null)
    );
  }
}
