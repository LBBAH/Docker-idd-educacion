import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { tipoRecurso } from 'src/app/service/tiporecurso';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorageServiceService } from 'src/app/service/local-storage-service.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [LocalStorageServiceService],
})
export class SearchComponent {

  resultados: any[] = [];
  recursoSee:any;
  titulosee:any;
  valoresCampo: any[] = [];

  private busquedaSubject = new Subject<string>();


  constructor(private nameServicio: IddServicesService,
    private router: Router,
    private LocalStorageServiceService: LocalStorageServiceService) {}

  ngOnInit(): void {  
    this.busquedaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => 
      {
        if (name.trim() === '') {
          this.resultados = []; // Borra los resultados si el campo de entrada está vacío
          return [];
        } else {
          return this.nameServicio.buscarPorNombre(name);
        }
      })
    ).subscribe((response) => {
      this.resultados = response;
      console.log(response)
    });
  }

  

  buscar(name: string): void {
    this.busquedaSubject.next(name);  
  }


  cursoId(id:any, title:any){    
    const data = { title: title };
    this.LocalStorageServiceService.setItem('myData', data);    
    this.router.navigate(['infoRecurso/', id]); 
  }
}
  //myControl = new FormControl('');
  //options !: tipoRecurso[];

  //FinalData !: Observable<tipoRecurso[]>;

  /*constructor(private service:IddServicesService,
    private router :Router) { 
    this.service.search().subscribe(item =>{
      this.options=item;
    })
  }*/

  /*ngOnInit(): void {
    this.FinalData=this.myControl.valueChanges.pipe(
      startWith(''),
      map(item=>{
        const name=item;
        return name?this._filter(name as string):this.options
      })
    )
  }*/

  /*SelectBand(name:any){
    console.log(name);
  }*/

  /*private _filter(name:string):tipoRecurso[]{
    const filterValue=name.toLocaleLowerCase();
    return this.options.filter(opt=>opt.name.toLocaleLowerCase().includes(filterValue));
  }

  redirecRecursos(id:any){
    this.router.navigate(['recurso/',id])
<<<<<<< Updated upstream
  }
=======
  }*/
