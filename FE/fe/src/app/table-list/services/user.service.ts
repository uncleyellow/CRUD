import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7289/api/Users';
  constructor(
    private http: HttpClient
  ) {

   }
   getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'accept': '*/*'
    });
    
    return this.http.post<any>(this.apiUrl, user, { headers });
  }
  updateUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'accept': '*/*'
    });
    
    return this.http.put<any>(`${this.apiUrl}`, user, { headers });
  }
  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': '*/*'
    });

    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers });
  }
  searchUsers(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }
}
