import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { donor } from '../domain/donor';
import { map } from 'rxjs';

@Injectable()
export class buyingService {
    
    constructor(private http: HttpClient) {

    }
    // allDonors:donor[];
    // getDonors(){
    //     let url = 'https://localhost:7049/api/Donor';
    //     return this.http.get<any[]>(url).pipe(map(l => this.allDonors = l)); 
    // }
    // addToCartServer(){
    //     let url = ;
    //     return this.http.post<any[]>(url,user).pipe(map(l => this.allUsers = l));
    // }

}