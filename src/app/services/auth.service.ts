import { Injectable } from '@angular/core';
import { Auth, Unsubscribe, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../auth/models/usuario.models';
import { Firestore, collection, addDoc, onSnapshot, doc } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUnsubcribe!: Unsubscribe;
  _user: Usuario | null = new Usuario(null, null, null);

  constructor(private auth: Auth, private firestore: Firestore, private store: Store<AppState>) { }
  // initAuthListener() {

  //   authState(this.auth).subscribe(user => {
  //     if (user) {
  //       console.log(user);
  //       // this.store.dispatch(authActions.setUser({ user: user }));

  //     } else {
  //       console.log('no ta');
  //     }
  //     // console.log(user?.email);
  //     // console.log(user?.uid);
  //   })

  // }
  initAuthListener() {
    authState(this.auth).subscribe(fUser => {
      if (fUser) {
        this.userUnsubcribe = onSnapshot(
          doc(this.firestore, fUser.uid, 'user'),
          (docUser: any) => {
            // console.log('docuser')
            // console.log(docUser)
            // console.log(docUser['_firestoreImpl']['_authCredentials']['auth']['auth']['currentUser'])

            // console.log(docUser['_userDataWriter']['firestore'])
            let data: any = docUser['_firestoreImpl']['_authCredentials']['auth']['auth']['currentUser']

            // console.log('data')
            // console.log(data);
            let user = Usuario.fromFirebase(data);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        )
      } else {
        this.userUnsubcribe ? this.userUnsubcribe() : null;
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }
  get user(): Usuario | null {
    return this._user
  }
  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new Usuario(user.uid, nombre, user.email);
      const userRef = collection(this.firestore, 'user');
      return addDoc(userRef, { ...newUser });
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
