import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  formEditUser: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:
    {
      id: number,
      nombre:string,
      nameU:string,
      telefono:string,
      correo:string     
    },
    private matDialogRef: MatDialogRef<EditUserComponent>,
    private router:Router,
    private http:HttpClient,
    private matDialog: MatDialog,
    private dataService:IddServicesService,
    public formulario:FormBuilder,
  ){
    this.formEditUser=this.formulario.group({
      name:['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      nameUser:['', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[a-zA-Z0-9]+$/i)]],
      phone:['', [Validators.required, Validators.maxLength(10),Validators.pattern(/^[0-9]+$/i)]],
      email:['' , [Validators.required, Validators.maxLength(30), Validators.pattern(this.emailPattern)]],
    });
  }

  ngOnInit(): void {
    this.formEditUser.setValue({
      name: this.data.nombre,
      nameUser: this.data.nameU,
      phone: this.data.telefono,
      email: this.data.correo,
      typeUser: this.data.correo,
    });
  }
  closeDialog(){
    this.matDialogRef.close();
  }
  UpdateUserz(){
    this.dataService.UpdateUserz(this.data.id, this.formEditUser.value).subscribe(res=>{
      let arr = Object.entries(res);
      if(arr[0][0] == "error"){
          alert(arr[0][1])
        }

        if(arr[0][0] == "success"){
          alert(arr[0][1])          
        }

    })
  }

  get name(){ return this.formEditUser.get('name');}
  get nameUser(){ return this.formEditUser.get('nameUser');}
  get phone(){ return this.formEditUser.get('phone');}
  get email(){ return this.formEditUser.get('email');}  
  
}
