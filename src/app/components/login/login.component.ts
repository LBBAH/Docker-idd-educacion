import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { SelectForgetPasswordComponent } from '../select-forget-password/select-forget-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  

  formlogin: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  

  constructor(
    public formulario:FormBuilder, 
    private dataService:IddServicesService, 
    private router: Router,
    private matDialog: MatDialog) { 
    this.formlogin=this.formulario.group({      
      email:['' , [Validators.required, Validators.pattern(this.emailPattern)]],
      password:['', [Validators.required]]      
    })
  }
  

  ngOnInit(): void {
    this.getdata()
  }

  getdata():any{
    this.dataService.getData().subscribe(res => {
      console.log(res)
    })
  }

  login():any{
    
  }

  loginUser():any{    
    if(this.formlogin.valid){
      this.dataService.login(this.formlogin.value).subscribe((res:any) => {

        let arr = Object.entries(res);
        if(arr[0][0] == "error"){
          alert(arr[0][1])
        }else{
          localStorage.setItem('user',JSON.stringify(res))
          this.router.navigate(['']).then(()=>{
            window.location.reload();
          })
        }              
      })
      
    }else{
      alert("Llene todos los datos")
    }
  }

  selectForgetPass(){
    this.matDialog.open(SelectForgetPasswordComponent,
      {        
      width:"500px",
      height: "150px",
      disableClose: false
    })
  }
  
  get email(){ return this.formlogin.get('email');}
  get password(){ return this.formlogin.get('password');}
}
