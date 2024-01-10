import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable()
export class ProductService {
    // private callToGetPresentSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // callToGetPresent$: Observable<boolean> = this.callToGetPresentSubject.asObservable();
    constructor(private http: HttpClient) {

    }
    allProducts: Product[];
    // allDonors:any[];


    getProducts(): Observable<any[]> {
        let url = 'https://localhost:7292/api/Present/getAllPresents';
        return this.http.get<any[]>(url).pipe(map(l => this.allProducts = l));
    }

    getProductsByExpensive(): Observable<any[]> {
        let url = 'https://localhost:7292/api/Present/byMostExpensive';
        return this.http.get<any[]>(url).pipe(map(l => this.allProducts = l));
    }
    getProductsByCheap(): Observable<any[]> {
        let url = 'https://localhost:7292/api/Present/byMostCheap';
        return this.http.get<any[]>(url).pipe(map(l => this.allProducts = l));
    }
    getProductsByPurches(): Observable<any[]> {
        let url = 'https://localhost:7292/api/Present/byMostPurchased';
        return this.http.get<any[]>(url).pipe(map(l => this.allProducts = l));
    }
    getProductsByName(productName: any): Observable<any[]> {
        if(productName==""){
            productName=null;
        }
        const encodedProductName = encodeURIComponent(productName);
        let url = `https://localhost:7292/api/Present/byName/${encodedProductName}`;
        return this.http.get<any[]>(url).pipe(map(l => this.allProducts = l));
    }

    deletePresent(productId: number): Observable<any[]> {
        let url = `https://localhost:7292/api/Present/${productId}`;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any[]>(url,{ headers }).pipe(map(l => this.allProducts = l));
    }

    updatePresent(productId: number, product: Product): Observable<any[]> {
        let url = `https://localhost:7292/api/Present/${productId}`;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.put<any[]>(url, product,{ headers }).pipe(map(l => this.allProducts = l));
    }
    createPresent(product: Product): Observable<any[]> {
        let url = `https://localhost:7292/api/Present/addPresent`;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any[]>(url, product,{ headers })
            .pipe(map(l => this.allProducts = l));
    }
    GetPresentByCategory(categories: string[]): Observable<any[]> {
        let url = `https://localhost:7292/api/Present/byCategory`;
        return this.http.post<any[]>(url, categories)
            .pipe(map(l => this.allProducts = l));
    }






}



