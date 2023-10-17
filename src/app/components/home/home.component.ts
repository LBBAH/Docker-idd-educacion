import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageServiceService]
})
export class HomeComponent implements OnInit{

  dataML:any;
  valoresCampo: any[] = []; // Array para almacenar los valores
  recurso:any;
  recursoSee:any;
  titulo:any
  titulosee:any
  recomendacionCompra:Boolean= false

  constructor (private http:HttpClient, 
    private serviceAuth:IddServicesService, 
    private router:Router,
    private LocalStorageServiceService: LocalStorageServiceService){
    
  }
  ngOnInit():void{
    AOS.init()
    this.getDataLS();
    this.getDataLSsee();
  }

  getDataLS(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };

    const data = this.LocalStorageServiceService.getItem('myData');
    this.titulo = data.title
    console.log(data.title);
    this.serviceAuth.getDataML(this.titulo,options).subscribe(
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

  getDataLSsee(){
    if(localStorage.getItem('user')!=null){
      const user:any = localStorage.getItem('user');    
      const userObj = JSON.parse(user);      
      const idUser = userObj.id;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const options = { headers: headers };

      const data = this.LocalStorageServiceService.getItem('datasee');
      const DataUsersee = data.id_user
      if(idUser == DataUsersee){    
        this.recomendacionCompra = true  
        this.titulosee = data.title
        console.log(data.title);
        this.serviceAuth.getDataML(this.titulosee,options).subscribe(
          (response) => {
            console.log(response)
            this.valoresCampo = response;
            this.serviceAuth.obtenerDatos(this.valoresCampo).subscribe((res)=>{
              console.log(res)
              this.recursoSee=res;
            })
            console.log(this.valoresCampo)
          }
        )
      }
    }
        
  }

  verCursosId(id:any){    
    this.router.navigate(['infoRecurso/', id]); 
  }

  verCursosIdVer(id:any, title:any){    
    const data = { title: title };
    this.LocalStorageServiceService.setItem('datasee', data);    
    this.router.navigate(['infoRecurso/', id]); 
  }
  
}
