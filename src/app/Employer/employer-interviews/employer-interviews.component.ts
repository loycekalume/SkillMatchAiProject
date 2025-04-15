import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Interview {
  id: number;
  name: string;
  position: string;
  type: 'Video' | 'Physical';
  status: 'scheduled' | 'done' | 'new';
  dateTime: string;
}

@Component({
  selector: 'app-employer-interviews',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './employer-interviews.component.html',
  styleUrls: ['./employer-interviews.component.css']
})
export class EmployerInterviewsComponent {
  // Toggle for search input visibility
  showSearchInput = false;
  
  // Search term
  searchTerm = '';
  
  // Toggle for edit modal
  showEditModal = false;
  
  // Currently selected interview for editing
  selectedInterview: Interview | null = null;
  
  // Original interviews data
  originalInterviews: Interview[] = [
    {
      id: 1,
      name: 'Loyce Kalume',
      position: 'Software Dev',
      type: 'Video',
      status: 'scheduled',
      dateTime: '25, Apr 10:00AM'
    },
    {
      id: 2,
      name: 'Grace Kalume',
      position: 'Graphic Designer',
      type: 'Physical',
      status: 'done',
      dateTime: '25, Mar 4:00PM'
    },
    {
      id: 3,
      name: 'Anthony Tial',
      position: 'Quality Assurance',
      type: 'Video',
      status: 'new',
      dateTime: '25, Apr 10:00AM'
    }
  ];
  
  // Filtered interviews (what's displayed in the table)
  interviews: Interview[] = [...this.originalInterviews];
  
  // Type options for dropdown
  typeOptions = ['Video', 'Physical'];
  
  // Status options for dropdown
  statusOptions = ['scheduled', 'done', 'new'];
  
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
      // Remove from original data
      this.originalInterviews = this.originalInterviews.filter(interview => interview.id !== id);
      
      // Apply search to update the filtered list
      this.applySearch();
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
     
      const index = this.originalInterviews.findIndex(interview => interview.id === this.selectedInterview!.id);
      
      if (index !== -1) {
        // Update the interview in the original data
        this.originalInterviews[index] = { ...this.selectedInterview };
        
        // Apply search to update the filtered list
        this.applySearch();
      }
      
      // Close the modal
      this.closeEditModal();
    }
  }
  
  // Get CSS class for status
  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}