import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { Firestore, collection, addDoc, onSnapshot, doc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../auth/models/ingreso-egreso.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: Firestore, private auth: AuthService) { }
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.auth._user?.uid as string;
    // return this.firestore.collection(`${uid}/ingresos-egresos/Items`).add({...ingresoEgreso})7
    const docRef = collection(this.firestore, 'ingresos-egresos');
    return addDoc(docRef, { ...ingresoEgreso });
  }
}
