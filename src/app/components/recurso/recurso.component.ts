import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';
import * as AOS from 'aos'
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css'],
  providers: [LocalStorageServiceService]
})
export class RecursoComponent implements OnInit {

  id:any;
  recurso:any;
  currentPage = 1;

  constructor(
    private activeRouter:ActivatedRoute,    
    private router: Router,
    private dataService:IddServicesService,
    private LocalStorageServiceService: LocalStorageServiceService
  ) { }

  getrecId(){
    this.id=this.activeRouter.snapshot.paramMap.get('id');    
    console.log(this.id);

    this.dataService.findBandId(this.id).subscribe(reply=>{        
      let array = Object.entries(reply);        
        if(array[0][0]=="warning"){
          this.router.navigate(['400']);
        }else{
          console.log(reply)
          this.recurso=reply;
        }    
      }
    )
  }

  obtenerDatosPaginados(idBusqueda: number, page: number): void {
    this.dataService.obtenerDatosPaginados(idBusqueda, page).subscribe(
      response => {
        let array = Object.entries(response);        
        if(array[0][0]=="warning"){
          this.router.navigate(['400']);
        }else{
          console.log(response.data)
          this.recurso=response.data;        
        }    
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.obtenerDatosPaginados(page, this.id);
  }

  buscarPorId(id: string): void {
    this.id = id;
    this.obtenerDatosPaginados(this.currentPage, this.id);
  }

  ngOnInit(): void {
    this.id=this.activeRouter.snapshot.paramMap.get('id');    
    AOS.init();
    this.obtenerDatosPaginados(this.id, this.currentPage);
  }

  verCursosId(id:any, title:any){
    this.router.navigate(['infoRecurso/', id]);
  }

}
