import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registroForm = this.fb.group({});
  }
  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  crearUsuario(): void {
    console.log(this.registroForm);
    if (this.registroForm.invalid) { return; }
    const { nombre, correo, password } = this.registroForm.value;
    Swal.showLoading();
    this.auth.crearUsuario(nombre, correo, password).then(credenciales => {
      console.log(credenciales)
      Swal.close();
      this.router.navigate(['/']);
    }).catch(err => Swal.fire("error en el registro", err.message, "error"))
  }

}
