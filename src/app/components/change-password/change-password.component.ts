import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  private passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
  formChangePass:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:
    {
      id: number
    },
    private matDialogRef: MatDialogRef<ChangePasswordComponent>,
    private router:Router,
    private http:HttpClient,
    private matDialog: MatDialog,
    private dataService:IddServicesService,
    public formulario:FormBuilder,
  ){  
    this.formChangePass=this.formulario.group({      
      passwordBefore:['', [Validators.required]],
      passwordNew:['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(this.passPattern)]],
    });
   
  }
  
  closeDialog(){
    this.matDialogRef.close()
  }

  UpdatePasswors(){
    this.dataService.changePassword(this.data.id, this.formChangePass.value).subscribe(res=>{
      let arr = Object.entries(res);
      if(arr[0][0] == "error"){
          alert(arr[0][1])
        }

        if(arr[0][0] == "success"){
          alert(arr[0][1])          
        }
    })
  }
  get passwordNew(){ return this.formChangePass.get('passwordNew');}
}
