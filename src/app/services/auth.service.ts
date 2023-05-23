import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../auth/models/usuario.models';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
 import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore:Firestore) { }
  initAuthListener() {

    this.auth.onAuthStateChanged(user => {
      console.log(user?.email);
      console.log(user?.uid);
    })

  }
  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new Usuario(user.uid, nombre, user.email);
      const userRef=collection(this.firestore,'user');
      return addDoc(userRef,{... newUser});
    });
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
