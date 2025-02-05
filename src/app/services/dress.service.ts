import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dress } from '../models/dress.model';

@Injectable({
  providedIn: 'root'
})
export class DressService {

  private readonly apiUrl = 'http://localhost:8080/fileManagement/upload';
  private readonly dressesUrl = 'http://localhost:8080/api/dresses';

  constructor(private http: HttpClient) {}

  getAllDresses(): Observable<Dress[]> {
    return this.http.get<Dress[]>(this.apiUrl);
  }

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));
    return this.http.post<string[]>(`${this.dressesUrl}/saveImages`, formData);
  }

  saveDress(dress: any): Observable<any> {
    return this.http.post<any>(`${this.dressesUrl}/saveDress`, dress);
  }
}
