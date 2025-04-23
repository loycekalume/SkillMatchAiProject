import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Job {
  job_id?: string;  // For PostgreSQL backend
  _id?: string;     // For compatibility with existing code
  title: string;
  location: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
  description: string;
  job_type: string;
  work_arrangement: string;
  experience_level: string;
  education_required?: string;
  application_deadline: string;
  employer_id?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-jobs-posted',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs-posted.component.html',
  styleUrl: './jobs-posted.component.css'
})
export class JobsPostedComponent implements OnInit {
  // Toggle for search input visibility
  showSearchInput = false;
  
  // Search term
  searchTerm = '';
  
  // Toggle for modals
  showEditModal = false;
  showCreateModal = false;
  
  // Currently selected job for editing
  selectedJob: Job | null = null;
  
  // New job template
  newJob: Job = this.getEmptyJob();
  
  // Jobs data
  originalJobs: Job[] = [];
  jobs: Job[] = [];
  
  // Loading state
  isLoading = true;
  isSubmitting = false;
  
  // Error message
  errorMessage = '';
  
  // Success message
  showSuccessMessage = false;
  successMessage = '';

  // Options for job fields
  locationOptions = ['remote', 'hybrid', 'on-site'];
  jobTypeOptions = ['full-time', 'part-time', 'contract', 'internship', 'freelance'];
  workArrangementOptions = ['remote', 'hybrid', 'on-Site'];
  experienceLevelOptions = ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Executive'];
  educationRequiredOptions = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'No Requirement'];
  
  // API base URL
  private apiUrl = 'http://localhost:5000/api/v1';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadJobs();
  }
  
  // Create empty job template
  getEmptyJob(): Job {
    return {
      title: '',
      location: '',
      description: '',
      job_type: 'full-Time',
      work_arrangement: 'remote',
      experience_level: 'entry Level',
      education_required: 'no Requirement',
      salary_min: 0,
      salary_max: 0,
      application_deadline: this.getDefaultDeadline(),
      created_at: new Date().toISOString()
    };
  }
  
  // Get default deadline (30 days from now)
  getDefaultDeadline(): string {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }
  
  // Fetch jobs from the API
  loadJobs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.errorMessage = 'Authentication required. Please log in again.';
      this.isLoading = false;
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    // Using the employer-specific endpoint from your API
    this.http.get<any>(`${this.apiUrl}/jobs`, { headers })
      .subscribe({
        next: (response) => {
          // Handle both array response and { data: array } response patterns
          this.originalJobs = Array.isArray(response) ? response : (response.data || []);
          this.jobs = [...this.originalJobs];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
          this.errorMessage = error.error?.message || 'Failed to load jobs. Please try again.';
          this.isLoading = false;
        }
      });
  }
  
  toggleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
    if (!this.showSearchInput) {
      this.searchTerm = '';
      this.applySearch();
    }
  }
  
  // Apply search filter
  applySearch(): void {
    if (!this.searchTerm.trim()) {
      // If search term is empty, show all jobs
      this.jobs = [...this.originalJobs];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.jobs = this.originalJobs.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.job_type.toLowerCase().includes(term) ||
      job.work_arrangement.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.experience_level.toLowerCase().includes(term)
    );
  }
  
  // Format salary range for display
  formatSalary(min: number, max: number): string {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }
  
  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  // Delete job
  deleteJob(id: string): void {
    if (confirm('Are you sure you want to delete this job?')) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        this.errorMessage = 'Authentication required. Please log in again.';
        return;
      }
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      // Handle both ID formats (job_id from PostgreSQL or _id)
      const jobId = id; 
      
      this.http.delete(`${this.apiUrl}/jobs/${jobId}`, { headers })
        .subscribe({
          next: () => {
            this.originalJobs = this.originalJobs.filter(job => 
              (job._id !== id && job.job_id !== id)
            );
            this.displaySuccessMessage('Job deleted successfully');
            this.applySearch();
          },
          error: (error) => {
            console.error('Error deleting job:', error);
            this.errorMessage = error.error?.message || 'Failed to delete job. Please try again.';
          }
        });
    }
  }
  
  // Create new job methods
  openCreateModal(): void {
    this.newJob = this.getEmptyJob();
    this.showCreateModal = true;
  }
  
  closeCreateModal(): void {
    this.showCreateModal = false;
  }
  
  createJob(): void {
    if (!this.validateJobData(this.newJob)) {
      return;
    }
    
    this.isSubmitting = true;
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.errorMessage = 'Authentication required. Please log in again.';
      this.isSubmitting = false;
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    this.http.post<Job>(`${this.apiUrl}/jobs`, this.newJob, { headers })
      .subscribe({
        next: (response) => {
          this.originalJobs.unshift(response);
          this.jobs = [...this.originalJobs];
          this.displaySuccessMessage('Job created successfully');
          this.closeCreateModal();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating job:', error);
          this.errorMessage = error.error?.message || 'Failed to create job. Please try again.';
          this.isSubmitting = false;
        }
      });
  }
  
  // Edit job methods
  openEditModal(job: Job): void {
    this.selectedJob = { ...job };
    this.showEditModal = true;
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedJob = null;
  }
  
  saveJob(): void {
    if (!this.selectedJob) return;
    
    if (!this.validateJobData(this.selectedJob)) {
      return;
    }
    
    this.isSubmitting = true;
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.errorMessage = 'Authentication required. Please log in again.';
      this.isSubmitting = false;
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    // Use the appropriate ID for the request
    const jobId = this.selectedJob.job_id || this.selectedJob._id;
    
    this.http.put<Job>(`${this.apiUrl}/jobs/${jobId}`, this.selectedJob, { headers })
      .subscribe({
        next: (response) => {
          // Update the job in our local array
          const index = this.originalJobs.findIndex(job => 
            (job._id === jobId || job.job_id === jobId)
          );
          
          if (index !== -1) {
            this.originalJobs[index] = response;
            this.jobs = [...this.originalJobs];
          }
          
          this.displaySuccessMessage('Job updated successfully');
          this.closeEditModal();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating job:', error);
          this.errorMessage = error.error?.message || 'Failed to update job. Please try again.';
          this.isSubmitting = false;
        }
      });
  }
  
  // Validate job data before submission
  validateJobData(job: Job): boolean {
    if (!job.title.trim()) {
      this.errorMessage = 'Job title is required';
      return false;
    }
    
    if (!job.description.trim()) {
      this.errorMessage = 'Job description is required';
      return false;
    }
    
    if (!job.location.trim()) {
      this.errorMessage = 'Location is required';
      return false;
    }
    
    if (job.salary_min < 0) {
      this.errorMessage = 'Minimum salary cannot be negative';
      return false;
    }
    
    if (job.salary_max <= job.salary_min) {
      this.errorMessage = 'Maximum salary must be greater than minimum salary';
      return false;
    }
    
    if (!job.application_deadline) {
      this.errorMessage = 'Application deadline is required';
      return false;
    }
    
    return true;
  }
  
  // Display success message with auto-hide
  displaySuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    this.errorMessage = '';
    
    // Auto hide the success message after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
  
  // Check if deadline has passed
  isDeadlinePast(deadline: string): boolean {
    return new Date(deadline) < new Date();
  }
  
  // Format days until deadline
  getDaysUntilDeadline(deadline: string): string {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days left`;
  }
  
  // Retry loading jobs if there was an error
  retryLoading(): void {
    this.loadJobs();
  }
}