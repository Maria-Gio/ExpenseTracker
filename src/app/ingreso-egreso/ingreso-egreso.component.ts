import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../auth/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: []
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  type: string = 'ingreso';
  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService) {
    this.ingresoForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],

    })
  }
  save(): void {
    if (this.ingresoForm.invalid) {
      return;
    }
    const { description, quantity } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(description, quantity, this.type);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset()
      Swal.fire(`${this.type} almacenado con exito`, undefined, "success")
    }).catch((err) => {
      Swal.fire(`Error, ${this.type} fallido`, 'error')
    });
    console.log(this.ingresoForm.valid)
    console.log(this.type)
  }
}
