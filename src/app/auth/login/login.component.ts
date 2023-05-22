import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({});
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  logIn(): void {
    if (this.loginForm.invalid) { return; }
    const { correo, password } = this.loginForm.value;
    Swal.showLoading();
    this.auth.login(correo, password).then(credenciales => {
      console.log(credenciales)
      Swal.close();
      this.router.navigate(['/']);
    }).catch(err => Swal.fire("error en el login", err.message, "error"))

  }
}
