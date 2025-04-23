import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterviewmodalComponent } from '../interviewmodal/interviewmodal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule, ReactiveFormsModule, InterviewmodalComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css'
})
export class EmployerDashboardComponent {
  isJobModalOpen = false;
  showInterviewModal = false;
  selectedCandidate = '';
  jobForm: FormGroup;
  showSuccessMessage = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      job_type: ['', Validators.required], 
      work_arrangement: ['', Validators.required],
      experience_level: ['', Validators.required],
      education_required: [''],
      salary_min: ['', Validators.required],
      salary_max: ['', Validators.required],
      application_deadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize icons or other UI components if needed
  }

  // Modal methods
  openJobModal(): void {
    this.isJobModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeJobModal(): void {
    this.isJobModalOpen = false;
    document.body.style.overflow = '';
  }

  openModal(name: string): void {
    this.selectedCandidate = name;
    this.showInterviewModal = true;
  }

  closeModal(): void {
    this.showInterviewModal = false;
  }

  handleInterviewScheduled(data: any): void {
    console.log('Interview scheduled:', data);
  }

  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    
    // Auto hide the success message after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      console.log('Submitting job:', jobData);
  
      const token = localStorage.getItem('token');
      console.log('Fetched token from localStorage:', token);
  
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.http.post('http://localhost:5000/api/v1/jobs', jobData, { headers }).subscribe({
        next: (res) => {
          console.log('Job created successfully:', res);
          // Close modal immediately
          this.closeJobModal();
          // Reset form
          this.jobForm.reset();
          // Show success message on main page after modal is closed
          this.displaySuccessMessage('Job posted successfully!');
        },
        error: (err) => {
          console.error('Error creating job:', err);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation visuals
      Object.keys(this.jobForm.controls).forEach(key => {
        this.jobForm.get(key)?.markAsTouched();
      });
    }
  }
}