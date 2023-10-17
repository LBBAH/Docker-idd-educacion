import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contac-us',
  templateUrl: './contac-us.component.html',
  styleUrls: ['./contac-us.component.css']
})
export class ContacUsComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formContact: FormGroup;

  constructor(public formulario:FormBuilder) {
    this.formContact=this.formulario.group({
      name:['', [Validators.required]],      
      phone:['', [Validators.required]],
      email:['' , [Validators.required, Validators.pattern(this.emailPattern)]],
      affair:['' , [Validators.required]],
      message:['' , [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  sendMessage(){
    if(this.formContact.valid){
      alert("Mensaje enviado con exito recibira una respuesta lo mas pronto posible")
    }else{
      alert("Error en los campos verifique de uevo")
    }
  }

  get name(){ return this.formContact.get('name');}  
  get phone(){ return this.formContact.get('phone');}
  get email(){ return this.formContact.get('email');}
  get affair(){ return this.formContact.get('affair');}
  get message(){ return this.formContact.get('message');}
}
