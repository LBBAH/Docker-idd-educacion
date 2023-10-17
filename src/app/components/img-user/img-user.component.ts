import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-img-user',
  templateUrl: './img-user.component.html',
  styleUrls: ['./img-user.component.css']
})
export class ImgUserComponent {

  formNewimg: FormGroup;
  file:any;
  formdata= new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:
    {
      id: number,
      
    },
    private matDialogRef: MatDialogRef<ImgUserComponent>,
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
      this.dataService.imgUserProfile(this.data.id,this.formdata).subscribe(res=>{
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
