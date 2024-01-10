import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { user } from '../domain/user';

@Injectable()
export class winnerService {
  constructor(private http: HttpClient) {
  }
  userWinner: user;
  makingLottery(presentId: number): Observable<any[]> {
    let url = 'https://localhost:7292/api/Winner/MakingLottery';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, presentId, { headers }).pipe(map(l => this.userWinner = l));

  }
  getPresentWinner(presentId: number): Observable<any[]> {
    let url = 'https://localhost:7292/api/Winner/GetWinnerPresent';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, presentId, { headers }).pipe(map(l => this.userWinner = l));
  }
}
