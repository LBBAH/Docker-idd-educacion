import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-img-background-user',
  templateUrl: './img-background-user.component.html',
  styleUrls: ['./img-background-user.component.css']
})
export class ImgBackgroundUserComponent {
  formNewimg: FormGroup;
  file:any;
  formdata= new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:
    {
      id: number,
      
    },
    private matDialogRef: MatDialogRef<ImgBackgroundUserComponent>,
    public formulario:FormBuilder,
    private dataService: IddServicesService,
    private router:Router
  ){
    this.formNewimg=this.formulario.group({      
      file:[null, [Validators.required]],
    })
  }

  imagensXD(){
    if(this.formNewimg.valid){
      this.dataService.imgUserPBackgroundProfile(this.data.id,this.formdata).subscribe(res=>{
        let arr = Object.entries(res);
        alert(arr[0][1]+ ', actualiza la pagina')
      })
    }else{
      alert('Debes subir una imagen')    
    }  
  }

  imagenUp(event:any){      
    this.file=event.target.files[0];    
    this.formdata.append("file", this.file, this.file.name)
    console.log(this.formdata)   
  }
}
