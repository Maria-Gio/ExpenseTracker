import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  uiSubscription: Subscription = new Subscription();
  loading: boolean = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.registroForm = this.fb.group({});
  }
  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading

    })
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  crearUsuario(): void {
    console.log(this.registroForm);
    if (this.registroForm.invalid) { return; }
    const { nombre, correo, password } = this.registroForm.value;
    this.store.dispatch(ui.isLoading())
    this.auth.crearUsuario(nombre, correo, password).then(credenciales => {
      console.log(credenciales)
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire("error en el registro", err.message, "error")
    })
  }

}
