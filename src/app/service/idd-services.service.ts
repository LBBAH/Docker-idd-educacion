import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from './recurso';
import { tipoRecurso } from 'src/app/service/tiporecurso';

@Injectable({
  providedIn: 'root'
})
export class IddServicesService {

  constructor( private httpClient: HttpClient ) { }
    
  //private apiUrl = 'https://educacionespecialmx.site/idd_Educatio_back/public_html/api';
  private apiUrl = 'http://127.0.0.1:8000/api';

  private apiUrlML = 'http://127.0.0.1:5000//apiv2/recomendaciones?titulo=';

  
    getData(){
      return this.httpClient.get(`${this.apiUrl}/Usuarios`);
    }

    getDataML(title:any, options:any){
      return this.httpClient.post<any>(`${this.apiUrlML}${title}`, options);
    }
  
    adduser(datosUsuario:any) {
      return this.httpClient.post(`${this.apiUrl}/addUser`, datosUsuario);
    }

    obtenerDatos(datosML:any) {
      return this.httpClient.post(`${this.apiUrl}/getDatML`, datosML);
    }
  
    login(datosUsuario:any) {
      return this.httpClient.post(`${this.apiUrl}/login`, datosUsuario);
    }
     
    getTypeRecurs() {
      return this.httpClient.get(`${this.apiUrl}/getTypeRecurs`);
    }

    obtenerDatosPaginadosUseridurso(id:any, page: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/getrecurosUsersId/`+id+`?page=${page}&per_page=20`);
    }

    obtenerDatosPaginados(id:any, page: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/getrecurosId/`+id+`?page=${page}&per_page=20`);
    }
  
    findBandId(id:any):Observable<Recurso[]>{
      return this.httpClient.get<Recurso[]>(`${this.apiUrl}/getrecurosId/`+id);
    }

    buscarPorNombre(name: string): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/searchRecursos?name=${name}`);
    }
  
    search():Observable<tipoRecurso[]>{
      return this.httpClient.get<tipoRecurso[]>(`${this.apiUrl}/search`);
    }

    logout(allDevice: boolean){
      const user:any = localStorage.getItem('user');
      const userObj = JSON.parse(user);      
  
      const token = userObj.token;
  
      var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' });
      return this.httpClient.post(`${this.apiUrl}/logout`,{allDevice:allDevice},{headers: tokenHeader})
    }

    passwordQuestionSecret(email:any) {
      return this.httpClient.post(`${this.apiUrl}/questionSecrectUser`, email);
    }

    anserQuestionSecret(dataAnswer:any) {
      return this.httpClient.post(`${this.apiUrl}/respuesta`, dataAnswer);
    }
  
    UpdateUserz(id:any, datosUsuario:any){
      return this.httpClient.post(`${this.apiUrl}/updateUser/`+id, datosUsuario);
    }

    getQuestions(){
      return this.httpClient.get(`${this.apiUrl}/getQuestion`);
    }

    addQuestionUser(idUser:any, dataQuestionUser:any){
      return this.httpClient.post(`${this.apiUrl}/addQuestionUser/`+idUser, dataQuestionUser);
    }

    changePassword(idUser:any, dataQuestionUser:any){
      return this.httpClient.post(`${this.apiUrl}/changePassword/`+idUser, dataQuestionUser);
    }

    getrecurosIdUser(id:any){
      return this.httpClient.post(`${this.apiUrl}/getrecurosIdUser`,id);
    }
    
    getAsociasiones(){
      return this.httpClient.get(`${this.apiUrl}/getAsociasiones`);
    }

    getTypeRecursos(){
      return this.httpClient.get(`${this.apiUrl}/getTypeRecurs`);
    }

    getrecurosEditId(data:any){
      return this.httpClient.get(`${this.apiUrl}/getrecurosEditId/`+data);
    }

    showObejtivoCursoId(id:any){
      return this.httpClient.post(`${this.apiUrl}/showObejtivoCursoId`,id);
    }

    showSeccionCursoId(id:any){
      return this.httpClient.post(`${this.apiUrl}/showSeccionCursoId`,id);
    }

    getRolPrivUser(id_rol:any){
      return this.httpClient.post(`${this.apiUrl}/rolPrivUser`,id_rol);
    }

    dataUser(tokenHeader:any){
      return this.httpClient.get(`${this.apiUrl}/user`,{headers:tokenHeader});
    }

    usercurso(cursosDeUsuario:any){
      return this.httpClient.post(`${this.apiUrl}/recursoUsuario`,cursosDeUsuario);
    }

    getCursoidUser(cursosDeUsuario:any){
      return this.httpClient.post(`${this.apiUrl}/recursoidUsuario`,cursosDeUsuario);
    }

    getCursoUserid(cursosDeUsuario:any){
      return this.httpClient.post(`${this.apiUrl}/getcursosUserid`,cursosDeUsuario);
    }

    imgUserProfile(id:any, dataImg:any){
      const headers = new HttpHeaders();
      return this.httpClient.post(`${this.apiUrl}/imgUser/`+id, dataImg,{
        headers:headers
      });
    }

    imgUserPBackgroundProfile(id:any, dataImg:any){
      const headers = new HttpHeaders();
      return this.httpClient.post(`${this.apiUrl}/imgBackGroundUser/`+id, dataImg,{
        headers:headers
      });
    }

    imgByIdUser(id:any){
      return this.httpClient.get(`${this.apiUrl}/imgByIdUser/`+id);
    }

    createResourcesByIdUser(id:any){
      return this.httpClient.get(`${this.apiUrl}/createResourcesByIdUser/`+id);
    }

    creaCurso(info:any){
      return this.httpClient.post(`${this.apiUrl}/addRecurso`, info);
    }

    vistapreviaCurso( id:any, info:any){
      return this.httpClient.post(`${this.apiUrl}/vistapreviaCurso/`+id, info);
    }

    updateCursoUserId( id:any, info:any){
      return this.httpClient.post(`${this.apiUrl}/updateCursoUserId/`+id, info);
    }

    seccioneCursoId( id:any){
      return this.httpClient.get(`${this.apiUrl}/seccionesCursoId/`+id);
    }

}
