import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { user } from 'src/app/domain/user';
import { userLogin } from 'src/app/domain/userLogin';
import { userService } from 'src/app/services/userService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ConfirmationService, MessageService, userService]

})
export class RegisterComponent {
  allMyusers: user[];
  userRegister: any;
  myUser?: user = {};
  id: string;
  value!: string;
  submitted:boolean;
  constructor(private router: Router, private userService: userService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.count++;
    
  }
  userToLogin: userLogin;
  register() {
    this.submitted=true;
    if(this.myUser.PostalCode&&this.myUser.userAddress&&this.myUser.userCity
      &&this.myUser.userCountry&&this.myUser.userEmail&&this.myUser.userFirstName&&
      this.myUser.userLastName&&this.myUser.userName&&this.myUser.userPassword&&this.myUser.userPhone&&this.validateEmail(this.myUser.userEmail)==true){
    this.createUserId();
    this.myUser.role = 'user';

    this.userService.createNewUser(this.myUser).subscribe(
    (data: any) => {
      console.log(data);
      this.userRegister = data
      if(this.userRegister==null){
        window.alert("משתמש לא נוסף")
      }
      else{
        window.alert("משתמש נוסף בהצלחה");
        this.router.navigate(['/בית/']);
        this.userToLogin = {
          userName: this.myUser.userName,
          userPassword: this.myUser.userPassword
        }
        console.log(this.userToLogin);
        
        this.userService.login(this.userToLogin).subscribe(response => {
          console.log(response);
          if (response.jsonToken) {
            const tokenObject = JSON.parse(response.jsonToken);
            localStorage.setItem('token', tokenObject.token);
          }
        })
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);
      alert("אירעה שגיאה בעת הרישום");
    }
  
    )}
  }
  count: number = 4592;
  date:Date=new Date();
  createUserId() {
    // this.date=Date.now();
    this.myUser.userId = this.count+this.date.getSeconds().toString();
    this.count++;
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
}




