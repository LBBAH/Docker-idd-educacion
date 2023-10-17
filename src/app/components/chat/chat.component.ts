import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  formChat: FormGroup;

  constructor(public formulario:FormBuilder) {
    this.formChat=this.formulario.group({      
      message:['' , [Validators.required]],
    })
  }

  ngOnInit(): void {
  }
  
  seendMessage():any{
    
    if(this.formChat.valid){
      alert("Mensaje Enviado")
    }
  }
  get message(){ return this.formChat.get('message');}
}
