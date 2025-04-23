// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProfileData {
  firstName: string;
  lastName: string;
  experience: string;
  title: string;
  education: string;
  location: string;
  company: string;
  portfolio: string;
  skills: string[];
}

export interface ApiProfileData {
  profile_id: string;
  user_id: number;
  experience_years: string;
  education_level: string;
  current_position: string;
  current_company: string;
  location: string;
  portfolio_url: string;
  resume_url: string | null;
  job_preference: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  skill_id: number;
  skill_name: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get profile by ID
  getProfile(id: string): Observable<ApiProfileData> {
    return this.http.get<ApiProfileData>(`${this.apiUrl}/jobseekerProfile/${id}`, { 
      headers: this.getHeaders() 
    });
  }

  // Update profile
  updateProfile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobseekerProfile/${id}`, data, { 
      headers: this.getHeaders() 
    });
  }

  // Get all available skills
  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/user_skills`, {
      headers: this.getHeaders()
    });
  }

  // Add a new skill to the system
  createSkill(skillName: string, category: string = 'Other'): Observable<any> {
    return this.http.post(`${this.apiUrl}/user_skills`, {
      skill_name: skillName,
      category: category
    }, { headers: this.getHeaders() });
  }

  // Convert frontend profile format to API format
  convertToApiFormat(profile: ProfileData): any {
    return {
      experience_years: profile.experience,
      education_level: profile.education,
      current_position: profile.title,
      current_company: profile.company,
      location: profile.location,
      portfolio_url: profile.portfolio,
      job_preference: null // Not in your UI but required by API
    };
  }

  // Convert API format to frontend format
  convertToFrontendFormat(apiProfile: ApiProfileData, skills: string[] = []): ProfileData {
    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return {
      firstName: user.firstName || 'User',
      lastName: user.lastName || '',
      experience: apiProfile.experience_years,
      title: apiProfile.current_position,
      education: apiProfile.education_level,
      location: apiProfile.location,
      company: apiProfile.current_company,
      portfolio: apiProfile.portfolio_url || '',
      skills: skills
    };
  }

  // Upload resume file
  uploadResume(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);
    
    return this.http.post(`${this.apiUrl}/jobseekerProfile/${id}/resume`, formData, {
      headers: this.getHeaders()
    });
  }
}