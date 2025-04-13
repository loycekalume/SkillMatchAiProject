import { Component } from '@angular/core';
import{SidebarComponent} from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ApplicationmodalComponent } from '../applicationmodal/applicationmodal.component';
import { CommonModule } from '@angular/common';
interface Job {
  title: string;
  matchPercentage: string;
  type: string;
  location: string;
  skills: string[];
  company?: string;
}

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterModule,ApplicationmodalComponent,CommonModule ],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrl: './jobseeker-dashboard.component.css'
})
export class JobseekerDashboardComponent {
  showApplicationModal = false;
  selectedJob: Job | null = null;
  
  jobs: Job[] = [
    {
      title: 'Senior Frontend Engineer',
      matchPercentage: '95%',
      type: 'Full-time',
      location: 'Remote',
      skills: ['React', 'Js', 'Angular', 'Express']
    },
    {
      title: 'Full-stack Developer',
      matchPercentage: '90%',
      type: 'Full-time',
      location: 'Remote',
      skills: ['React', 'Angular', 'Express']
    }
  ];
  
  openApplicationModal(job: Job): void {
    this.selectedJob = job;
    this.showApplicationModal = true;
  }
  
  closeApplicationModal(): void {
    this.showApplicationModal = false;
    this.selectedJob = null;
  }
  
  handleApplicationSubmit(formData: FormData): void {
    console.log('Application submitted:', formData);
    
  }
}
