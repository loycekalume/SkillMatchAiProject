import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Application {
  id: number;
  name: string;
  position: string;
  yearsOfExperience: string;
  status: 'new' | 'in-review' | 'interview' | 'rejected' | 'accepted';
  dateApplied: string;
}
@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [SidebarComponent,FormsModule,CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  showSearchInput = false;
  

  searchTerm = '';
  

  showEditModal = false;
  
  
  selectedApplication: Application | null = null;
  
  
  statusOptions = ['new', 'in-review', 'interview', 'rejected', 'accepted'];
  

  originalApplications: Application[] = [
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
  

  applications: Application[] = [...this.originalApplications];
  

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
     
      this.originalApplications = this.originalApplications.filter(app => app.id !== id);
      
      
      this.applySearch();
    }
  }

  openEditModal(application: Application): void {
   
    this.selectedApplication = { ...application };
    this.showEditModal = true;
  }
  
  // Close edit modal
  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedApplication = null;
  }
  
 
  saveApplication(): void {
    if (this.selectedApplication) {
     
      const index = this.originalApplications.findIndex(app => app.id === this.selectedApplication!.id);
      
      if (index !== -1) {
       
        this.originalApplications[index] = { ...this.selectedApplication };
        
       
        this.applySearch();
      }
      
      
      this.closeEditModal();
    }
  }

}
