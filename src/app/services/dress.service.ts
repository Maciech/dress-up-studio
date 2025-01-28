import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dress } from '../models/dress.model';

@Injectable({
  providedIn: 'root'
})
export class DressService {

  private readonly apiUrl = 'http://localhost:8080/fileManagement/upload';

  constructor(private http: HttpClient) {}

  getAllDresses(): Observable<Dress[]> {
    return this.http.get<Dress[]>(this.apiUrl);
  }
}
