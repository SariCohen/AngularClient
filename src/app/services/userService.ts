import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../domain/user';
import { Observable, map } from 'rxjs';
import { userLogin } from '../domain/userLogin';

@Injectable()
export class userService {
    
    constructor(private http: HttpClient) {

    }
    singleUser:user;
    allUsers:user[];
    getUsers(){
        let url = 'https://localhost:44304/api/Users';
        return this.http.get<any[]>(url).pipe(map(l => this.allUsers = l)); 
    }
    createNewUser(user:user):Observable<any>{
         let url = 'https://localhost:7292/api/User/register';
        return this.http.post<any[]>(url,user).pipe(map(l => this.allUsers = l));
    }

    login(userLogin:userLogin):Observable<any> {
        let url='https://localhost:7292/api/User/login';
        return this.http.post<any[]>(url,userLogin).pipe(map(l => this.allUsers = l));
    }

}