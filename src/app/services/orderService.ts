import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {order} from '../domain/order'

import { BehaviorSubject, Observable, map } from 'rxjs';
@Injectable()
export class orderService {
    
    constructor(private http: HttpClient) {

    }
    allProducts:any[];
    // createPresent(product:Product): Observable<any[]> {
    //     let url = `https://localhost:7049/api/Present`
    //     return this.http.post<any[]>(url,product)
    //     .pipe(map(l => this.allProducts = l));

    // createNewOrder(order:order):Observable<any>{
    //      let url = `https://localhost:44304/api/Orders`
    //          return this.http.post<any[]>(url,order);

    //////////////////////////

addToCart(presentId:number): Observable<any[]> {
let url ='https://localhost:7292/api/Order/addToCart';
const token = localStorage.getItem('token');
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});
return this.http.post<any[]>(url, presentId, { headers }).pipe(map(l => this.allProducts = l));
}

getUserCart(): Observable<any[]> {
  let url ='https://localhost:7292/api/Order/getBuyerPresent';
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
  }

deleteFromCart(presentId:number): Observable<any[]> {
  let url ='https://localhost:7292/api/Order/deleteFromCart';
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<any[]>(url,presentId,{ headers }).pipe(map(l => this.allProducts = l));
  }
  deleteFromCartOne(presentId:number): Observable<any[]> {
    let url ='https://localhost:7292/api/Order/deleteFromCartOne';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any[]>(url,presentId,{ headers }).pipe(map(l => this.allProducts = l));
    }



  payForBusket(presentIds:number[]): Observable<any[]> {
    let url ='https://localhost:7292/api/Order/makePayment';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any[]>(url,presentIds,{ headers }).pipe(map(l => this.allProducts = l));
    }

    getAllBuyersDetails(): Observable<any[]> {
      let url ='https://localhost:7292/api/Order/getBuyersDetails';
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
      }

      getBuyerPresent(): Observable<any[]> {
        let url ='https://localhost:7292/api/Order/getBuyerPresent';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
        }

        getAllpurchases(): Observable<any[]> {
          let url ='https://localhost:7292/api/Order/getAllpurchases';
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
          }
          getTotalIncome(): Observable<any[]> {
            let url ='https://localhost:7292/api/Order/TotalIncome';
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            });
            return this.http.get<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
            }
        
    }

    
    
