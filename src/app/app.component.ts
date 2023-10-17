import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IddServicesService } from './service/idd-services.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';

declare var paypal: { Buttons: (arg0: { createOrder: (data: any, action: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageServiceService]
})
export class AppComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  user:any;
  dataUser:Boolean=false;
  RegisterLogin:Boolean=true;
  logOutUser:Boolean=true;
  dataML:any;
  valoresCampo: any[] = []; // Array para almacenar los valores
  recurso:any;
  id:any;
  imagenesPerfil:any;
  perfilimagenesUsuario:Boolean=false;
  perfilSinimagenesUsuario:Boolean=true;

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor (private http:HttpClient, 
    private serviceAuth:IddServicesService, 
    private router:Router,
    private LocalStorageServiceService: LocalStorageServiceService){
    
  }

  toggleLoginIn(state:boolean):void{
    this.isLoggedIn.next(state);
  };

  status(){
    const localData :any = localStorage.getItem('user');
    if(!localData){
      this.dataUser= false;
      this.RegisterLogin= true;
      console.log(this.dataUser,this.RegisterLogin);
      this.isLoggedIn.next(false);
      console.log('User not logged in !!')
    }else{
      const userObj = JSON.parse(localData);
      this.dataUser= true;
      this.RegisterLogin= false;
      console.log(this.dataUser,this.RegisterLogin);
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


  ngOnInit(): void {    

    this.status();
    if(localStorage.getItem('user')!=null){
      const user:any = localStorage.getItem('user');    
      const userObj = JSON.parse(user);      
      const token = userObj.token;
      this.id=userObj.id
      var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' });
      
      this.serviceAuth.dataUser(tokenHeader).subscribe((res)=>{        
        this.user=res;
        console.log(this.user);
        
      },(err) =>{
        console.log(err)
      });

    }else{
      this.dataUser= false;
      this.RegisterLogin= true;
      console.log(this.dataUser,this.RegisterLogin);
    }

    this.datosImagenesPerfil()
    
  }

  getDataLS(){    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };

    const data = this.LocalStorageServiceService.getItem('myData');
    const titulo = data.title
    console.log(data.title);
    this.serviceAuth.getDataML(titulo,options).subscribe(
      (response) => {
        console.log(response)
        this.valoresCampo = response;
        this.serviceAuth.obtenerDatos(this.valoresCampo).subscribe((res)=>{
          console.log(res)
          this.recurso=res;
        })
        console.log(this.valoresCampo)
      }
    )
        
  }
    
  perfilUser(id:any){
    this.router.navigate(['perfilU',id])
  }

  logout(){    
      this.serviceAuth.logout(true).subscribe((res)=>{
        console.log(res);
        localStorage.removeItem('user');
        this.router.navigate(['']).then(()=>{
          window.location.reload();
        })
      })          
  }

  closePlease(): void {
    const divClose = document.getElementById('navbar-Responsive');
    if (divClose) {
      divClose.style.display = 'none';
    } else {
      console.error('Element with ID "navbarPage-response" not found.');
    }
  }
  
  openPlease(): void {
    const divOpen = document.getElementById('navbar-Responsive');
    if (divOpen) {
      divOpen.style.display = 'block';
    } else {
      console.error('Element with ID "navbarPage-response" not found.');
    }
  }

  datosImagenesPerfil(){
    this.serviceAuth.imgByIdUser(this.id).subscribe((res=>{
      this.imagenesPerfil=res;
      let arr = Object.entries(res);
      if(arr[0][0] == "error"){
        this.perfilSinimagenesUsuario=true
        this.perfilimagenesUsuario=false
      }else{
        this.perfilSinimagenesUsuario=false
        this.perfilimagenesUsuario=true
      }
    }))
  }
  title = 'appV2';
}
