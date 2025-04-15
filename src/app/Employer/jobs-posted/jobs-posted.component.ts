import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  datePosted: string;
}
@Component({
  selector: 'app-jobs-posted',
  standalone: true,
  imports: [SidebarComponent,CommonModule,FormsModule],
  templateUrl: './jobs-posted.component.html',
  styleUrl: './jobs-posted.component.css'
})
export class JobsPostedComponent {
 // Toggle for search input visibility
 showSearchInput = false;
  
 // Search term
 searchTerm = '';
 
 // Toggle for edit modal
 showEditModal = false;
 
 // Currently selected job for editing
 selectedJob: Job | null = null;
 
 // Original jobs data
 originalJobs: Job[] = [
   {
     id: 1,
     title: 'Software Dev',
     location: 'On-site',
     salary: '50,000',
     datePosted: '25, Apr'
   },
   {
     id: 2,
     title: 'Graphic Designer',
     location: 'Hybrid',
     salary: '50,000',
     datePosted: '25, Mar'
   },
   {
     id: 3,
     title: 'Quality Assurance',
     location: 'Remote',
     salary: '50,000',
     datePosted: '25, Apr'
   }
 ];
 
 
 jobs: Job[] = [...this.originalJobs];

 locationOptions = ['On-site', 'Remote', 'Hybrid'];
 
 
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
     job.salary.toLowerCase().includes(term) ||
     job.datePosted.toLowerCase().includes(term)
   );
 }
 
 
 deleteJob(id: number): void {
   if (confirm('Are you sure you want to delete this job?')) {
   
     this.originalJobs = this.originalJobs.filter(job => job.id !== id);
     
    
     this.applySearch();
   }
 }
 
 
 openEditModal(job: Job): void {
  
   this.selectedJob = { ...job };
   this.showEditModal = true;
 }
 

 closeEditModal(): void {
   this.showEditModal = false;
   this.selectedJob = null;
 }
 
 saveJob(): void {
   if (this.selectedJob) {
    
     const index = this.originalJobs.findIndex(job => job.id === this.selectedJob!.id);
     
     if (index !== -1) {
       this.originalJobs[index] = { ...this.selectedJob };
       
   
       this.applySearch();
     }
     

     this.closeEditModal();
   }
 }
}

