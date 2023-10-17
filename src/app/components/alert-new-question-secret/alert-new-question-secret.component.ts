import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-alert-new-question-secret',
  templateUrl: './alert-new-question-secret.component.html',
  styleUrls: ['./alert-new-question-secret.component.css']
})
export class AlertNewQuestionSecretComponent implements OnInit{

  formNewQuestion:FormGroup

  questionSec:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:
    {
      id: number
    },
    private matDialogRef: MatDialogRef<AlertNewQuestionSecretComponent>,
    private router:Router,
    private http:HttpClient,
    private matDialog: MatDialog,
    private dataService:IddServicesService,
    public formulario:FormBuilder,
  ){  
    this.formNewQuestion=this.formulario.group({      
      id_questionSecret:['', [Validators.required]],
      answer:['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
    });
   
  }
  ngOnInit(): void {
    this.dataService.getQuestions().subscribe(res=>{
      console.log(res);
      this.questionSec=res;
    });      
  }

  closeDialog(){
    this.matDialogRef.close()
  }

  UpdateQuestion(id:any){
    this.dataService.addQuestionUser(this.data.id, this.formNewQuestion.value).subscribe(res=>{
      console.log(res)
      let arr = Object.entries(res);        
          alert(arr[0][1])
    }) 
  }
  get answer(){ return this.formNewQuestion.get('answer');}
}
