import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterviewmodalComponent } from '../interviewmodal/interviewmodal.component';
interface Candidate {
  id: number;
  name: string;
  position: string;
  initials: string;
}

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterModule,CommonModule,ReactiveFormsModule,InterviewmodalComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css'
})

export class EmployerDashboardComponent {
  isJobModalOpen = false;
  jobForm: FormGroup;
  
  
  
  

  constructor(private fb: FormBuilder) {
    // Set minimum date to today
    
    // Initialize job form
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobSkills: ['', Validators.required],
      salary: ['', Validators.required]
    });
    
    
  }

  ngOnInit(): void {
    // Initialize Feather icons if needed
    
  }
  
  // Job Modal methods
  openJobModal(): void {
    this.isJobModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeJobModal(): void {
    this.isJobModalOpen = false;
    document.body.style.overflow = '';
  }

  submitJobForm(): void {
    if (this.jobForm.valid) {
      console.log('Job form submitted:', this.jobForm.value);
      this.closeJobModal();
      this.jobForm.reset();
    } else {
      Object.keys(this.jobForm.controls).forEach(key => {
        this.jobForm.get(key)?.markAsTouched();
      });
    }
  }
  showInterviewModal = false;
selectedCandidate = '';

openModal(name: string): void {
  this.selectedCandidate = name;
  this.showInterviewModal = true;
}

handleInterviewScheduled(data: any): void {
  console.log('Interview scheduled:', data);
}
closeModal() {
  this.showInterviewModal = false;
}

}