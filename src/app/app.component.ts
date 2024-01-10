import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    flag:boolean=true;
    changeLogin(bool:boolean){
      console.log(this.flag);
      console.log(bool);
      this.flag=bool;
      console.log(this.flag);
      
    }
  }