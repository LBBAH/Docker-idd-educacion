import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-forget-password',
  templateUrl: './select-forget-password.component.html',
  styleUrls: ['./select-forget-password.component.css']
})
export class SelectForgetPasswordComponent {

  constructor(
    private router:Router,
    private matDialogRef: MatDialogRef<SelectForgetPasswordComponent>
  ){

  }
  questionSecretP(){
    this.router.navigate(['preguntaSecreta']);
    this.matDialogRef.close()
  }
}
