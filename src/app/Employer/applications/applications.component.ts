import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationService, Application } from '../../services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SidebarComponent
  ],
  providers: [ApplicationService],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  showSearchInput = false;
  searchTerm = '';
  showEditModal = false;
  selectedApplication: Application | null = null;
  statusOptions = ['new', 'in-review', 'interview', 'rejected', 'accepted'];
  originalApplications: Application[] = [];
  applications: Application[] = [];
  loading = false;
  error = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading = true;
    this.error = '';
    
    this.applicationService.getApplications().subscribe({
      next: (data) => {
        // Map the backend data to our frontend format
        this.originalApplications = data.map(item => this.applicationService.mapToFrontendFormat(item));
        this.applications = [...this.originalApplications];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
        this.error = 'Failed to load applications. Please try again later.';
        this.loading = false;
        
        // Fallback to mock data in case of error
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    this.originalApplications = [
      {
        id: 1,
        name: 'Loyce Kalume',
        position: 'Software Dev',
        yearsOfExperience: '5 years',
        status: 'in-review',
        dateApplied: '25, Apr'
      },
      {
        id: 2,
        name: 'Grace Kalume',
        position: 'Graphic Designer',
        yearsOfExperience: '5 years',
        status: 'interview',
        dateApplied: '25, March'
      },
      {
        id: 3,
        name: 'Anthony Tial',
        position: 'Quality Assurance',
        yearsOfExperience: '2 years',
        status: 'new',
        dateApplied: '25, Apr'
      }
    ];
    this.applications = [...this.originalApplications];
  }

  toggleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
    if (!this.showSearchInput) {
      this.searchTerm = '';
      this.applySearch();
    }
  }
  
  applySearch(): void {
    if (!this.searchTerm.trim()) {
      this.applications = [...this.originalApplications];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.applications = this.originalApplications.filter(app => 
      app.name.toLowerCase().includes(term) ||
      app.position.toLowerCase().includes(term) ||
      app.status.toLowerCase().includes(term) ||
      app.yearsOfExperience.toLowerCase().includes(term) ||
      app.dateApplied.toLowerCase().includes(term)
    );
  }
  
  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.loading = true;
      
      this.applicationService.deleteApplication(id).subscribe({
        next: () => {
          this.originalApplications = this.originalApplications.filter(app => app.id !== id);
          this.applySearch();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          alert('Failed to delete application. Please try again.');
          this.loading = false;
        }
      });
    }
  }

  openEditModal(application: Application): void {
    this.selectedApplication = { ...application };
    this.showEditModal = true;
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedApplication = null;
  }
  
  saveApplication(): void {
    if (this.selectedApplication) {
      this.loading = true;
      
      const backendData = this.applicationService.mapToBackendFormat(this.selectedApplication);
      
      this.applicationService.updateApplication(this.selectedApplication.id, backendData).subscribe({
        next: (response) => {
          const updatedApplication = this.applicationService.mapToFrontendFormat(response.application);
          
          const index = this.originalApplications.findIndex(app => app.id === updatedApplication.id);
          if (index !== -1) {
            this.originalApplications[index] = updatedApplication;
            this.applySearch();
          }
          
          this.closeEditModal();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating application:', err);
          alert('Failed to update application. Please try again.');
          this.loading = false;
        }
      });
    }
  }
}