import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { AlertNewQuestionSecretComponent } from '../alert-new-question-secret/alert-new-question-secret.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { NewCursoComponent } from '../new-curso/new-curso.component';
import {ImgUserComponent} from '../img-user/img-user.component'
import * as AOS from 'aos'
import { style } from '@angular/animations';
import { ImgBackgroundUserComponent } from '../img-background-user/img-background-user.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit{

  CrearRecursos:Boolean=false;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  id:any;
  cursosForIdUser:any;
  recurso:any;
  currentPage = 1;
  cursosForUserId:any;

  cursosCOmpraos:any;

  imagenesPerfil:any;
  perfilimagenesUsuario:Boolean=false;
  perfilSinimagenesUsuario:Boolean=true;

  mensajeCursosCreacion:any;

  user:any;
  constructor(
    private router:Router,
    private http:HttpClient,
    private matDialog: MatDialog,
    private dataService: IddServicesService,
    private activeRouter:ActivatedRoute
  ){

  }

  obtenerDatosPaginados(idBusqueda: number, page: number): void {
    this.dataService.obtenerDatosPaginadosUseridurso(idBusqueda, page).subscribe(
      response => {
        let array = Object.entries(response);        
        if(array[0][0]=="warning"){
          this.router.navigate(['400']);
        }else{
          console.log(response.data)
          this.cursosForIdUser=response.data;        
        }    
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerDatocursoUsuaiioId(idusuario: number): void {
    this.dataService.getrecurosIdUser({id_usuario:idusuario}).subscribe(response => {   
        console.log(response)     
          this.cursosForUserId=response;                
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.obtenerDatosPaginados(this.id, page);
  }

  buscarPorId(id: string): void {
    this.id = id;
    this.obtenerDatosPaginados(this.id, this.currentPage,);
  }

  cursosCompradosPorUsuario(id_user:any){
    this.dataService.getCursoUserid({id_usuario:id_user}).subscribe(res =>{
      this.cursosCOmpraos = res;
      console.log(res)
    })
  }

  ngOnInit(): void {
    AOS.init();
    this.status();

    const quieroCrearCurso = document.getElementById('quieroCrearCurso');
    const crearCursos = document.getElementById('crearCursos');
   
    if(localStorage.getItem('user')!=null){ 
      const user:any = localStorage.getItem('user');    
      const userObj = JSON.parse(user);      
      const token = userObj.token;
      const id_u = userObj.id;
      const typeUser = userObj.typeUser;
      this.id=userObj.id
      var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' });
      
      this.dataService.dataUser(tokenHeader).subscribe((res)=>{        
        this.user=res;
        console.log(this.user);
        
      },(err) =>{
        console.log(err)
      });
      console.log(id_u)
      this.dataService.getRolPrivUser({id_rol:typeUser, id_Privilegio:23}).subscribe(res=>{            
        console.log(res)
        let arr = Object.entries(res);
        if(arr[0][0] == "success"){
          this.CrearRecursos=true
          if(quieroCrearCurso && crearCursos){
              quieroCrearCurso.style.display = 'none';
              crearCursos.style.display = 'block';
          }
        }else{
          if(quieroCrearCurso && crearCursos){
            quieroCrearCurso.style.display = 'block';
            crearCursos.style.display = 'none';
        }
        }
      })     
      this.obtenerDatosPaginados(id_u,this.currentPage);
      this.obtenerDatocursoUsuaiioId(id_u)
      this.imagenesUsuario(id_u)
      this.mycursosId(id_u)
      this.cursosCompradosPorUsuario(id_u)
    }
    
  }


  mycursosId(id_user:any){
    this.dataService.createResourcesByIdUser(id_user).subscribe(res=>{
      this.mensajeCursosCreacion = res
    })
  }

  imagenesUsuario(id_user:any){
    this.dataService.imgByIdUser(id_user).subscribe(res=>{
      this.imagenesPerfil=res;
      let arr = Object.entries(res);
      if(arr[0][0] == "error"){
        this.perfilSinimagenesUsuario=true
        this.perfilimagenesUsuario=false
      }else{
        this.perfilSinimagenesUsuario=false
        this.perfilimagenesUsuario=true
      }
    })
  }

  toggleLoginIn(state:boolean):void{
    this.isLoggedIn.next(state);
  };

  status(){
    const localData :any = localStorage.getItem('user');
    if(!localData){      
      this.isLoggedIn.next(false);
      this.router.navigate([''])
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

  editarUsuario(id_u:any, nombre:any, nombreU:any, email:any, telefon:any){
    
    this.matDialog.open(EditUserComponent,
      {
        data:{
          id:id_u,
          nombre:nombre,
          nameU:nombreU,
          correo:email,
          telefono:telefon
        },
        width:"500px",
        height: "500px"
      });
  }

  questionSecret(id_u:any){
    this.matDialog.open(AlertNewQuestionSecretComponent,
      {
        data:{
          id:id_u
        },
        width:"500px",
        height: "500px"
      });
  }

  changePassword(id_u:any){
    this.matDialog.open(ChangePasswordComponent,
      {
        data:{
          id:id_u
        },
        width:"500px",
        height: "500px"
      });
  }
  verCursosId(id:any){
    this.router.navigate(['editCursoid/', id]);  
  }

  newCurso(id_u:any){
    this.matDialog.open(NewCursoComponent,
      {
        data:{
          id:id_u
        },
        width:"500px",
        height: "500px"
      });
  }

  userImgProfile(id_u:any){
    this.matDialog.open(ImgUserComponent,
      {
        data:{
          id:id_u
        },
        width:"300px",
        height: "300px"
      });
  }

  userImgBackground(id_u:any){
    this.matDialog.open(ImgBackgroundUserComponent,
      {
        data:{
          id:id_u
        },
        width:"300px",
        height: "300px"
      });
  }


  showOrNone(option:number):void{
    const divDatos = document.getElementById('data-user-changue');
    const divCursos = document.getElementById('data-user-cursos');
    const diCrear = document.getElementById('data-user-CrearCursos');

    if(divDatos){
      if(divCursos){
        if(diCrear){

          if(option == 1){           
              divCursos.style.display = 'none';
              diCrear.style.display = 'none';
              divDatos.style.display = 'block';
          }
          if(option == 2){
            divDatos.style.display = 'none';
            diCrear.style.display = 'none';    
            divCursos.style.display = 'block';        
          }

          if(option == 3){
            divCursos.style.display = 'none';
            divDatos.style.display = 'none';          
            diCrear.style.display = 'block';          
          }

        }
      }
    }  

  }
  
  editarCurso(id:any){
    this.router.navigate(['editCursoid/', id]);
  }
}
