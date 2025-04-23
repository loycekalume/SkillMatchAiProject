import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Interview {
  id: number;
  name: string;
  position: string;
  type: 'Video' | 'Physical';
  status: 'scheduled' | 'done' | 'new';
  dateTime: string;
  
  // New fields to match backend
  interview_id?: number;
  application_id?: number;
  employer_id?: number;
  job_seeker_id?: number;
  interview_type?: string;
  scheduled_date?: string;
  duration_minutes?: number;
  location?: string;
  meeting_link?: string;
  notes?: string;
}

@Component({
  selector: 'app-employer-interviews',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './employer-interviews.component.html',
  styleUrls: ['./employer-interviews.component.css']
})
export class EmployerInterviewsComponent implements OnInit {
  // Base API URL
  private apiUrl = 'http://localhost:5000/api/v1'; // Adjust this according to your backend URL
  
  // Toggle for search input visibility
  showSearchInput = false;
  
  // Search term
  searchTerm = '';
  
  // Toggle for edit modal
  showEditModal = false;
  
  // Currently selected interview for editing
  selectedInterview: Interview | null = null;
  
  // Original interviews data
  originalInterviews: Interview[] = [];
  
  // Filtered interviews (what's displayed in the table)
  interviews: Interview[] = [];
  
  // Type options for dropdown
  typeOptions = ['Video', 'Physical'];
  
  // Status options for dropdown
  statusOptions = ['scheduled', 'done', 'new'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInterviews();
  }

  // Fetch interviews from backend
  fetchInterviews(): void {
    // Get HTTP headers with auth token
    const headers = this.getAuthHeaders();
    
    this.http.get<any[]>(`${this.apiUrl}/interviews`, { headers })
      .subscribe({
        next: (data) => {
          // Transform backend data to match frontend format
          this.originalInterviews = data.map(item => this.transformInterviewFromBackend(item));
          this.interviews = [...this.originalInterviews];
        },
        error: (error) => {
          console.error('Error fetching interviews:', error);
          alert('Failed to load interviews. Please try again later.');
        }
      });
  }

  // Transform backend interview data to frontend format
  transformInterviewFromBackend(backendInterview: any): Interview {
    // Get job seeker name from application data if available, or use job_seeker_id as fallback
    const name = backendInterview.job_seeker_name || `Job Seeker ${backendInterview.job_seeker_id}`;
    
    // Get position title from related job data if available
    const position = backendInterview.position_title || 'Not specified';

    // Convert timestamp to formatted date
    const date = new Date(backendInterview.scheduled_date);
    const dateTime = `${date.getDate()}, ${this.getMonthShortName(date.getMonth())} ${this.formatTime(date)}`;

    return {
      id: backendInterview.interview_id,
      interview_id: backendInterview.interview_id,
      name: name,
      position: position,
      type: backendInterview.interview_type === 'remote' ? 'Video' : 'Physical',
      status: backendInterview.status,
      dateTime: dateTime,
      
      // Keep original backend fields for when we need to update
      application_id: backendInterview.application_id,
      employer_id: backendInterview.employer_id,
      job_seeker_id: backendInterview.job_seeker_id,
      interview_type: backendInterview.interview_type,
      scheduled_date: backendInterview.scheduled_date,
      duration_minutes: backendInterview.duration_minutes,
      location: backendInterview.location,
      meeting_link: backendInterview.meeting_link,
      notes: backendInterview.notes
    };
  }

  // Transform frontend interview format to backend format
  transformInterviewToBackend(frontendInterview: Interview): any {
    // Parse the dateTime string to a Date object
    const [day, month, timeStr] = frontendInterview.dateTime.split(' ');
    const monthIndex = this.getMonthIndex(month.replace(',', ''));
    const year = new Date().getFullYear();
    
    // Parse time (format: "10:00AM")
    const match = timeStr.match(/(\d+:\d+)(\w+)/);
    if (!match) {
      throw new Error('Invalid time format');
    }
    const [timeDigits, ampm] = match.slice(1);
    let [hours, minutes] = timeDigits.split(':').map(Number);
    if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
    
    // Create ISO date string
    const dateObj = new Date(year, monthIndex, parseInt(day), hours, minutes);
    const isoDateString = dateObj.toISOString();

    return {
      interview_id: frontendInterview.interview_id,
      application_id: frontendInterview.application_id,
      employer_id: frontendInterview.employer_id,
      job_seeker_id: frontendInterview.job_seeker_id,
      interview_type: frontendInterview.type === 'Video' ? 'remote' : 'in-person',
      scheduled_date: isoDateString,
      duration_minutes: frontendInterview.duration_minutes || 30, // Default to 30 min if not set
      location: frontendInterview.location || '',
      meeting_link: frontendInterview.type === 'Video' ? (frontendInterview.meeting_link || '') : '',
      notes: frontendInterview.notes || '',
      status: frontendInterview.status
    };
  }

  // Helper method to get month short name
  getMonthShortName(monthIndex: number): string {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
  }

  // Helper method to get month index from short name
  getMonthIndex(monthShortName: string): number {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .findIndex(m => m === monthShortName);
  }

  // Helper method to format time
  formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${hours}:${minutes}${ampm}`;
  }

  // Toggle search input visibility
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
      // If search term is empty, show all interviews
      this.interviews = [...this.originalInterviews];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.interviews = this.originalInterviews.filter(interview => 
      interview.name.toLowerCase().includes(term) ||
      interview.position.toLowerCase().includes(term) ||
      interview.type.toLowerCase().includes(term) ||
      interview.status.toLowerCase().includes(term) ||
      interview.dateTime.toLowerCase().includes(term)
    );
  }
  
  // Delete an interview
  deleteInterview(id: number): void {
    if (confirm('Are you sure you want to delete this interview?')) {
      const headers = this.getAuthHeaders();
      
      this.http.delete(`${this.apiUrl}/interviews/${id}`, { headers })
        .subscribe({
          next: () => {
            // Remove from original data
            this.originalInterviews = this.originalInterviews.filter(interview => interview.id !== id);
            
            // Apply search to update the filtered list
            this.applySearch();
            
            alert('Interview deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting interview:', error);
            alert('Failed to delete interview. Please try again.');
          }
        });
    }
  }
  
  // Open edit modal
  openEditModal(interview: Interview): void {
    this.selectedInterview = { ...interview };
    this.showEditModal = true;
  }
  
  // Close edit modal
  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedInterview = null;
  }
  
  // Save edited interview
  saveInterview(): void {
    if (this.selectedInterview) {
      const headers = this.getAuthHeaders();
      const backendData = this.transformInterviewToBackend(this.selectedInterview);
      
      this.http.put(`${this.apiUrl}/interviews/${this.selectedInterview.id}`, backendData, { headers })
        .subscribe({
          next: (response: any) => {
            // Update the interview in the original data
            const index = this.originalInterviews.findIndex(interview => interview.id === this.selectedInterview!.id);
            
            if (index !== -1) {
              // Update with transformed data from the response
              this.originalInterviews[index] = this.transformInterviewFromBackend(response.interview);
              
              // Apply search to update the filtered list
              this.applySearch();
            }
            
            // Close the modal
            this.closeEditModal();
            
            alert('Interview updated successfully');
          },
          error: (error) => {
            console.error('Error updating interview:', error);
            alert('Failed to update interview. Please try again.');
          }
        });
    }
  }
  
  // Create a new interview (could be attached to a button)
  createInterview(interviewData: Partial<Interview>): void {
    const headers = this.getAuthHeaders();
    const backendData = this.transformInterviewToBackend(interviewData as Interview);
    
    this.http.post(`${this.apiUrl}/interviews`, backendData, { headers })
      .subscribe({
        next: (response: any) => {
          // Add the new interview to the original data
          const newInterview = this.transformInterviewFromBackend(response.interview);
          this.originalInterviews.push(newInterview);
          
          // Apply search to update the filtered list
          this.applySearch();
          
          alert('Interview created successfully');
        },
        error: (error) => {
          console.error('Error creating interview:', error);
          alert('Failed to create interview. Please try again.');
        }
      });
  }
  
  // Get CSS class for status
  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
  
  // Get authenticated headers
  private getAuthHeaders(): HttpHeaders {
    // Retrieve the auth token from local storage
    const token = localStorage.getItem('token');
    
    // Return headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}