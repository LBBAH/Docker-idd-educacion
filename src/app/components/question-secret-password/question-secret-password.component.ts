import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { IddServicesService } from 'src/app/service/idd-services.service';
import { RecaptchaService } from 'src/app/service/recaptcha.service';

@Component({
  selector: 'app-question-secret-password',
  templateUrl: './question-secret-password.component.html',
  styleUrls: ['./question-secret-password.component.css']
})
export class QuestionSecretPasswordComponent {
  resetPass: FormGroup;
  answerQuestion: FormGroup;
  formAnswer:Boolean=false;
  formEmail:Boolean=true;
  divNuexPas:Boolean=false;
  dataQuestionAnsers:any;
  dataAnswer:any;
  
  public robot: boolean;
  public presionado: boolean;

  //siteKey:string="6LeyLUUlAAAAAMIdJ_JpyH1MNKFVuH7F2be-tBeQ";
  siteKey:string="6LfeRCYlAAAAADAry4-Fs1iNzksdyGXmRCo9aXk_";

  constructor(
    public formulario:FormBuilder, 
    public serviceIdd:IddServicesService,
    public router:Router,
    )       
  {  
    this.robot = true;
      this.presionado = false;
    this.resetPass=this.formulario.group({      
      email:['',[Validators.required]],        
    });
    this.answerQuestion=this.formulario.group({      
      answer:['',[Validators.required]],
      recaptch:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
  }
 

  resetPasswordUser(){
    this.serviceIdd.passwordQuestionSecret(this.resetPass.value).subscribe(res=>{
      console.log(res);
      let arr = Object.entries(res);
        if(arr[0][0] == "error"){
          alert(arr[0][1])
        }else{
          this.dataQuestionAnsers=res
          this.formEmail=false
          this.formAnswer=true
          console.log(this.dataQuestionAnsers.value.questionsSecret)
        }
    })
  }

  respuestaPreguna(id_u:any){
    //console.log(id_user, this.answerQuestion.value.answer)
    if(this.answerQuestion.valid){
      this.serviceIdd.anserQuestionSecret({id_user:id_u,answer:this.answerQuestion.value.answer}).subscribe(res=>{
        let arr = Object.entries(res);
          if(arr[0][0] == "error"){
            alert(arr[0][1])
          }else{
            this.dataAnswer=res
            this.formAnswer=false
            this.divNuexPas=true
            console.log(this.dataQuestionAnsers.value.questionsSecret)
          }
      })
    }
    else{
      alert('Compruebe todos los campos')
    }  
  }

  redirectLogin(){
    this.router.navigate(['login']);
  }

  get email(){ return this.resetPass.get('email');}
  get answer(){ return this.resetPass.get('answer');}


}
