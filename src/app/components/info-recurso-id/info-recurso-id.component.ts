import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';
import * as AOS from 'aos'
import { BehaviorSubject, subscribeOn } from 'rxjs';
declare var paypal: { Buttons: (arg0: { createOrder: (data: any, action: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };


@Component({
  selector: 'app-info-recurso-id',
  templateUrl: './info-recurso-id.component.html',
  styleUrls: ['./info-recurso-id.component.css'],
  providers: [LocalStorageServiceService]
})
export class InfoRecursoIdComponent implements OnInit{
  title = 'recurso';
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  
  id:any
  editCurso:any;
  objetivos:any;
  seccion:any;
  recurso:any;
  titulo:any;
  valoresCampo: any[] = [];
  cursodeUsuario:Boolean = false;
  
  constructor(
    private activeRouter:ActivatedRoute,        
    private dataService: IddServicesService,
    private router:Router,
    private LocalStorageServiceService: LocalStorageServiceService
  ) { 
    
  }
  
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.id=this.activeRouter.snapshot.paramMap.get('id');  
    
    if (user) {
      // El atributo idUser existe en el objeto userObj
      const userObj = JSON.parse(user);
      const iduser = userObj.id;
      
      this.dataService.getCursoidUser({id_curso:parseInt(this.id), id_usuario:iduser}).subscribe(res=>{
        
        let arr = Object.entries(res);
        
        if(arr[0][0] == "success"){
          this.cursodeUsuario = false
        }else{
          this.cursodeUsuario = true
        }
      })
    }
    this.status()
    AOS.init()
    
    this.dataService.getrecurosEditId(this.id).subscribe(res=>{
      this.editCurso=res   
      console.log(res)   
    })
  
    this.dataService.showObejtivoCursoId({id_curso:this.id}).subscribe(res=>{
      
      this.objetivos=res
    })
    this.dataService.showSeccionCursoId({id_curso:this.id}).subscribe(res=>{
      
      this.seccion=res
    })
    this.getDataLS()

   
    
  }

  status(){
    const localData :any = localStorage.getItem('user');
    if(!localData){      
      this.isLoggedIn.next(false);
      console.log('User not logged in !!')
    }else{
      const userObj = JSON.parse(localData);      
      const token_expires_at = new Date(userObj.token_expies_at);
      const current_date = new Date();
      if(token_expires_at > current_date){
        this.isLoggedIn.next(true)
      }else{
        this.isLoggedIn.next(false);
        console.log('token expires !!')
      }
    }
  }

  pago(nombre:any, precio:any, id_curso:any){
    console.log(nombre.toString(), parseFloat(precio),id_curso)
    const valorActual = this.isLoggedIn.getValue();

    if (valorActual === false) {
      alert("para obtener este curso debes iniciar sesion primero")
      return
    }   
    
    if (precio ==0) {
      alert("El precio de este curso es gratis pero debes añadir un metodo de pago, no se te cobra por esta accion")      
    }

    const user:any = localStorage.getItem('user');    
    const userObj = JSON.parse(user);      
    const iduser = userObj.id;

    paypal.
    Buttons({
      createOrder:(data,action)=>{
        return action.order.create({
          purchase_units:[
            {
              description:nombre.toString(),
              amount:{
                currency_code:'MXN',
                value:parseFloat(precio)
              }
            }
          ]          
        })
      },
      onApprove: async(data, actions)=>{
        const order = await actions.order.capture();
        this.dataService.usercurso({id_curso:id_curso, id_usuario:iduser}).subscribe(res=>{
          let arr = Object.entries(res);
          if(arr[0][0] == "success"){
            alert(arr[0][1])
          }
        })
        const datasee = { title: nombre, id_user: iduser};
        this.LocalStorageServiceService.setItem('datasee', datasee);
        console.log(order)
      },
      onError:err=>{
        console.log(err)
      }
    }).
    render(this.paypalElement.nativeElement)
  
  }

  getDataLS(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };

    const data = this.LocalStorageServiceService.getItem('myData');
    this.titulo = data.title
    console.log(data.title);
    this.dataService.getDataML(this.titulo,options).subscribe(
      (response) => {
        console.log(response)
        this.valoresCampo = response;
        this.dataService.obtenerDatos(this.valoresCampo).subscribe((res)=>{          
          this.recurso=res;
        })
        console.log(this.valoresCampo)
      }
    )
        
  }

  verCursosId(id:any){    
    this.router.navigate(['infoRecurso/', id]); 
  }

}
