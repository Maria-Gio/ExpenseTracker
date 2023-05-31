import { Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder,
    private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.loginForm = this.fb.group({});
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
      console.log('cargando subs')
    })
  }

  logIn(): void {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch(ui.isLoading())
    const { correo, password } = this.loginForm.value;
    // Swal.showLoading();
    this.auth.login(correo, password).then(credenciales => {
      console.log(credenciales)
      // Swal.close();
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/']);
    }).catch(err => {
      Swal.fire("error en el login", err.message, "error");
      this.store.dispatch(ui.stopLoading());
    }



    )

  }
}
