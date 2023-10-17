import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit{

  ngOnInit():void{
    AOS.init()
  }

  eventoClick(){
    alert('Diste Un Clik!')
  }

  eventoDoble(){
    alert('Diste Doble click!')
  }

  eventoMousemove(){
    alert('Estas moviendo el mouse dentro de este elemento!')
  }

  eventoMouseOut(){
    alert('Estas fuera del elemento!')
  }

  eventoMouseDown(){
    alert('Pulsaste un boton del mouse!')
  }

  eventoContextMenu(){
    alert('Pulsaste el boton Derecho!')
  }

}
