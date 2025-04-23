import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployerProfile {
  profile_id: string;
  user_id: number;
  company_name: string;
  company_size: string;
  industry: string;
  location: string;
  company_description: string;
  website_url: string;
  logo_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployerProfileService {
  private apiUrl = 'http://localhost:5000/api/v1/employerProfile';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getProfileById(id: string): Observable<EmployerProfile> {
    return this.http.get<EmployerProfile>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProfile(profile: EmployerProfile): Observable<any> {
    return this.http.post<any>(this.apiUrl, profile, {
      headers: this.getAuthHeaders()
    });


  }

  updateProfile(id: string, profile: EmployerProfile): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, profile, {
      headers: this.getAuthHeaders()
    });
  }

  // Optional: handle file uploads separately
  uploadLogo(profileId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('logo', file);

    return this.http.post<any>(`${this.apiUrl}/${profileId}/uploadLogo`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
}
