import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { user } from 'src/app/domain/user';
import { userLogin } from 'src/app/domain/userLogin';
import { userService } from 'src/app/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ConfirmationService, MessageService, userService]
})

export class LoginComponent implements OnInit{
  user:any;
  submitted:boolean=false;
  constructor(private router:Router,private userService:userService, private messageService: MessageService, private confirmationService: ConfirmationService){}
ngOnInit(): void {
  this.myUser={};

}
myUser:user;
myAllUser:user[];
userLogin:any;
userToLogin:userLogin;
loginChange: EventEmitter<boolean>=new EventEmitter<boolean>();
  login(){
   if(this.myUser.userName && this.myUser.userPassword){
    this.userToLogin={
      userName:this.myUser.userName,
      userPassword:this.myUser.userPassword
    }
    this.userService.login(this.userToLogin).subscribe(
    (response: any) => {
      console.log(response);
      if (response.jsonToken) {
        const tokenObject = JSON.parse(response.jsonToken);
        localStorage.removeItem('token');
        localStorage.setItem('token', tokenObject.token);
        this.router.navigate(['/רכישה/']);
      } else {
        console.log('User not found');
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);
      alert("משתמש לא קיים ,מועבר לדף רישום");
      this.router.navigate(['/הרשמה/']);
    }
  );
   }
}
      
register(){
  this.loginChange.emit(false);
  this.router.navigate(['/הרשמה/']);  
    
}
}
