import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IddServicesService } from 'src/app/service/idd-services.service';
import * as AOS from 'aos'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';


@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit{
  typeRecurs:any;  

  constructor(
    private datatypeR:IddServicesService,
    private router:Router,
    private serviceAuth:IddServicesService, 
    private LocalStorageServiceService: LocalStorageServiceService
  ) { }

  ngOnInit(): void {
    this.getdatatypeR();
    AOS.init();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: headers };

    const data = this.LocalStorageServiceService.getItem('myData');
    const titulo = data.title
    console.log(data.title);
    this.serviceAuth.getDataML(titulo,options).subscribe(
      (response) => {
        console.log(response);        
      },
      (error) => {
        console.error(error);
      
    }
    )
  }

  getdatatypeR(){
    this.datatypeR.getTypeRecurs().subscribe(reply =>{
      console.log(reply)
      this.typeRecurs=reply;
    })
  }
  verCursos(id:any){
    
    this.router.navigate(['recurso/', id]);    
  }
  

}
