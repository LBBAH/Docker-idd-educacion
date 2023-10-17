import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IddServicesService } from 'src/app/service/idd-services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  user:any;
  dataUser:Boolean=false;
  RegisterLogin:Boolean=true;
  logOutUser:Boolean=true;

  private isLoggedIn = new BehaviorSubject<boolean>(false);
    
  constructor (private http:HttpClient, private serviceAuth:IddServicesService, private router:Router){}

  toggleLoginIn(state:boolean):void{
    this.isLoggedIn.next(state);
  };

  status(){
    const localData :any = localStorage.getItem('user');
    if(!localData){
      this.isLoggedIn.next(false);
      console.log('User not logged in !!')
    }else{
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expies_at);
      const current_date = new Date();
      if(token_expires_at > current_date){
        this.isLoggedIn.next(true)
      }else{
        this.isLoggedIn.next(false);
        console.log('token expires !!')
      }
    }
  }
  
  

  ngOnInit(): void {
    this.status();
    if(localStorage.getItem('user')!=null){
      this.dataUser= true;
      this.RegisterLogin= false;
      console.log(this.dataUser,this.RegisterLogin);
      const user:any = localStorage.getItem('user');    
      const userObj = JSON.parse(user);      
      const token = userObj.token;
      var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' });
      
      this.serviceAuth.dataUser(tokenHeader).subscribe((res)=>{        
        this.user=res;
        console.log(this.user);
        
      },(err) =>{
        console.log(err)
      });

    }else{

      this.dataUser= false;
      this.RegisterLogin= true;
      console.log(this.dataUser,this.RegisterLogin);

    }
  
  }
    

  logout(){    
      this.serviceAuth.logout(true).subscribe((res)=>{
        console.log(res);
        localStorage.removeItem('user');
        this.router.navigate(['home']).then(()=>{
          window.location.reload();
        })
      })          
  }

}
