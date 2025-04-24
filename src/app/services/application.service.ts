// src/app/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  id: number;
  application_id?: number;
  name: string;
  position: string;
  yearsOfExperience: string;
  status: 'new' | 'in-review' | 'interview' | 'rejected' | 'accepted';
  dateApplied: string;
  // Backend properties
  job_id?: number;
  job_seeker_id?: number;
  cover_letter?: string;
  resume_url?: string;
  match_percentage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5000/api/v1/applications'; // Use your actual API URL

  constructor(private http: HttpClient) {}

  // Helper method to get auth headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all applications
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Get application by ID
  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Create new application
  createApplication(application: Partial<Application>): Observable<any> {
    return this.http.post(this.apiUrl, application, { headers: this.getHeaders() });
  }

  // Update application
  updateApplication(id: number, application: Partial<Application>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, application, { headers: this.getHeaders() });
  }

  // Delete application
  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Map backend data to frontend format
  mapToFrontendFormat(backendData: any): Application {
    return {
      id: backendData.application_id,
      name: backendData.name || 'Unknown',
      position: backendData.position || 'Unknown',
      yearsOfExperience: backendData.years_of_experience || '0 years',
      status: backendData.status || 'new',
      dateApplied: backendData.created_at ? new Date(backendData.created_at).toLocaleDateString() : 'Unknown',
      // Keep backend properties
      application_id: backendData.application_id,
      job_id: backendData.job_id,
      job_seeker_id: backendData.job_seeker_id,
      cover_letter: backendData.cover_letter,
      resume_url: backendData.resume_url,
      match_percentage: backendData.match_percentage
    };
  }

  // Map frontend data to backend format
  mapToBackendFormat(frontendData: Application): any {
    return {
      application_id: frontendData.application_id || frontendData.id,
      job_id: frontendData.job_id,
      job_seeker_id: frontendData.job_seeker_id,
      cover_letter: frontendData.cover_letter,
      resume_url: frontendData.resume_url,
      status: frontendData.status,
      match_percentage: frontendData.match_percentage
    };
  }
}