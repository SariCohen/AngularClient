import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { donor } from '../domain/donor';
import { Observable, map } from 'rxjs';

@Injectable()
export class donorService { 
    constructor(private http: HttpClient) {
    }
    allDonors:donor[];
    getDonors(){
        let url ='https://localhost:7292/api/Donors/getAllDonors';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allDonors = l)); 
    }
    
    deleteDonor(donorId: string): Observable<any[]> {  
        let url = `https://localhost:7292/api/Donors/${donorId}`;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any[]>(url,{ headers }).pipe(map(l => this.allDonors = l));
    }
    createNewDonor(donor:donor){
        let url = 'https://localhost:7292/api/Donors/addDonor';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    return this.http.post<any[]>(url,donor,{ headers }).pipe(map(l => this.allDonors = l));
}

getDonorByName(name: string): Observable<any[]> {  
    if(name==""){
        name=null;
    }
    const encodedName = encodeURIComponent(name);
  
    let url = `https://localhost:7292/byName/${encodedName}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allDonors = l));
}

getDonorByPresentName(presentName: string): Observable<any[]> { 
    if(presentName==""){
        presentName=null;
    } 
    const encodedepresentName = encodeURIComponent(presentName);
    let url = `https://localhost:7292/byPresent/${encodedepresentName}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allDonors = l));
}

getDonorByEmail(email: string): Observable<any[]> {  
    if(email==""){
        email=null;
    }
    const encodedemail = encodeURIComponent(email);
    let url = `https://localhost:7292/byEmail/${encodedemail}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allDonors = l));
}



}


