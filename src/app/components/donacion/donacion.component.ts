import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.css']
})
export class DonacionComponent implements OnInit {
  formDonacion: FormGroup;

  constructor(public formulario:FormBuilder) {
    this.formDonacion=this.formulario.group({      
      name:['' , [Validators.required]],
      lastName:['' , [Validators.required]],
      nameCart:['' , [Validators.required]],
      cartnumber:['' , [Validators.required]],
      expiration:['' , [Validators.required]],
      cvv:['' , [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  verifyDonation():any{
    alert("me presionaste")
  }

  get name(){ return this.formDonacion.get('name');}
  get lastName(){ return this.formDonacion.get('lastName');}
  get nameCart(){ return this.formDonacion.get('nameCart');}
  get cartnumber(){ return this.formDonacion.get('cartnumber');}
  get expiration(){ return this.formDonacion.get('expiration');}
  get cvv(){ return this.formDonacion.get('cvv');}
}
