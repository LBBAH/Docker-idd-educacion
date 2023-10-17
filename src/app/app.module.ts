import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { AvisoPrivacidadComponent } from './components/aviso-privacidad/aviso-privacidad.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContacUsComponent } from './components/contac-us/contac-us.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { DonacionComponent } from './components/donacion/donacion.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { PreguntasFComponent } from './components/preguntas-f/preguntas-f.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuestionSecretPasswordComponent } from './components/question-secret-password/question-secret-password.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { Injectable, Inject } from '@angular/core';

 
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';

import { NgxCaptchaModule } from 'ngx-captcha';
import { AlertNewQuestionSecretComponent } from './components/alert-new-question-secret/alert-new-question-secret.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NewCursoComponent } from './components/new-curso/new-curso.component';
import { EditCursoIdComponent } from './components/edit-curso-id/edit-curso-id.component';
import { InfoRecursoIdComponent } from './components/info-recurso-id/info-recurso-id.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { Error400Component } from './components/error400/error400.component';
import { Error500Component } from './components/error500/error500.component';
import { StickyMessageComponent } from './components/sticky-message/sticky-message.component';
import { BannerComponent } from './components/banner/banner.component';

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { ImgUserComponent } from './components/img-user/img-user.component';
import { ImgBackgroundUserComponent } from './components/img-background-user/img-background-user.component';

const routes: Routes =[
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component:HomeComponent },
  {path:'avisoPrivacidad', component:AvisoPrivacidadComponent },
  {path:'chat', component:ChatComponent },
  {path:'contactUs', component:ContacUsComponent },
  {path:'donacion', component:DonacionComponent },
  {path:'editUser', component:EditUserComponent },
  {path:'login', component:LoginComponent },
  {path:'quienesSomos', component:QuienesSomosComponent },
  {path:'recursos', component:RecursosComponent },
  {path:'singIn', component:RegistroComponent },
  {path:'recurso/:id',component:RecursoComponent },
  {path: 'preguntasf', component:PreguntasFComponent},
  {path: 'preguntaSecreta', component:QuestionSecretPasswordComponent},
  {path: 'perfilU/:id', component:PerfilUsuarioComponent},
  {path: 'editCursoid/:id', component:EditCursoIdComponent},
  {path: 'infoRecurso/:id', component:InfoRecursoIdComponent},
  { path: '400', component: Error400Component},
  { path: '500', component: Error500Component},
  { path: '**', component:NotFountComponent },    
];

@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    SearchComponent,
    FooterComponent,
    FiltroComponent,
    ChatComponent, 
    ContacUsComponent,
    DonacionComponent,
    RegistroComponent,
    AvisoPrivacidadComponent,
    LoginComponent,
    RecursosComponent,
    RecursoComponent,
    PreguntasFComponent,
    ScrollToTopComponent,
    MenuComponent,
    QuestionSecretPasswordComponent,
    PerfilUsuarioComponent,
    EditUserComponent,
    AlertNewQuestionSecretComponent,
    ChangePasswordComponent,
    NewCursoComponent,
    EditCursoIdComponent,
    InfoRecursoIdComponent,
    StickyMessageComponent,
    BannerComponent,
    Error400Component,
    Error500Component,
    NotFountComponent,
    QuienesSomosComponent,
    ImgUserComponent,
    ImgBackgroundUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    CommonModule,
    RecaptchaV3Module,
    HttpClientModule,    
    
    RouterModule.forRoot(
      routes, { preloadingStrategy: PreloadAllModules }
    ),
    
    
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: 'pon_la_key_de_google',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
