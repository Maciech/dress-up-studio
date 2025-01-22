// src/app/services/dress.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dress } from '../model/dress.model';

@Injectable({
  providedIn: 'root'
})
export class DressService {
  private apiUrl = 'http://localhost:8080/api/dresses';

  constructor(private http: HttpClient) {}

  getAllDresses(): Observable<Dress[]> {
    return this.http.get<Dress[]>(this.apiUrl);
  }

  createDress(dress: Dress): Observable<Dress> {
    return this.http.post<Dress>(this.apiUrl, dress);
  }

  getDressByName(name: string): Observable<Dress> {
    return this.http.get<Dress>(`${this.apiUrl}/${name}`);
  }

  deleteDress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
