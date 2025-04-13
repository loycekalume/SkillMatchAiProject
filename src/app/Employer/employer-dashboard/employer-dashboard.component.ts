import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
interface Candidate {
  id: number;
  name: string;
  position: string;
  initials: string;
}
interface Interviewer {
  id: number;
  name: string;
  role: string;
}
@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css'
})

export class EmployerDashboardComponent {
  isJobModalOpen = false;
  jobForm: FormGroup;
  
  // Interview Modal properties
  isInterviewModalOpen = false;
  interviewForm: FormGroup;
  selectedCandidate: Candidate | null = null;
  selectedTimeSlot: string | null = null;
  selectedInterviewType: string | null = null;
  isFormSubmitted = false;
  minDate: string;
  
  // Available time slots
  timeSlots: string[] = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];
  
  // Available interviewers
  interviewersList: Interviewer[] = [
    { id: 1, name: 'Sarah Johnson', role: 'HR Manager' },
    { id: 2, name: 'Michael Chen', role: 'Tech Lead' },
    { id: 3, name: 'Emily Rodriguez', role: 'Senior Developer' },
    { id: 4, name: 'David Kim', role: 'CTO' }
  ];

  constructor(private fb: FormBuilder) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Initialize job form
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobSkills: ['', Validators.required],
      salary: ['', Validators.required]
    });
    
    // Initialize interview form
    this.interviewForm = this.fb.group({
      interviewDate: [this.minDate, Validators.required],
      duration: ['60', Validators.required],
      interviewers: [[], Validators.required],
      notes: ['']
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
  
  // Interview Modal methods
  openInterviewModal(candidate: Candidate): void {
    this.selectedCandidate = candidate;
    this.isInterviewModalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Reset form when opening
    this.interviewForm.reset({
      interviewDate: this.minDate,
      duration: '60',
      interviewers: [],
      notes: ''
    });
    this.selectedTimeSlot = null;
    this.selectedInterviewType = null;
    this.isFormSubmitted = false;
    
    // Update Feather icons in the modal
    setTimeout(() => {
     
    }, 0);
  }

  closeInterviewModal(): void {
    this.isInterviewModalOpen = false;
    document.body.style.overflow = '';
    this.selectedCandidate = null;
  }
  
  selectTimeSlot(slot: string): void {
    this.selectedTimeSlot = slot;
  }
  
  selectInterviewType(type: string): void {
    this.selectedInterviewType = type;
  }
  
  submitInterviewForm(): void {
    this.isFormSubmitted = true;
    
    if (this.interviewForm.invalid || !this.selectedTimeSlot || !this.selectedInterviewType) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.interviewForm.controls).forEach(key => {
        this.interviewForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    // Form is valid, prepare data
    const interviewData = {
      candidateId: this.selectedCandidate?.id,
      candidateName: this.selectedCandidate?.name,
      candidatePosition: this.selectedCandidate?.position,
      date: this.interviewForm.value.interviewDate,
      timeSlot: this.selectedTimeSlot,
      duration: this.interviewForm.value.duration,
      interviewType: this.selectedInterviewType,
      interviewers: this.interviewForm.value.interviewers,
      notes: this.interviewForm.value.notes
    };
    
    console.log('Interview scheduled:', interviewData);
    
    // Here you would typically send the data to your backend
    // this.interviewService.scheduleInterview(interviewData).subscribe(response => {
    //   console.log('Interview scheduled:', response);
    //   this.closeInterviewModal();
    // });
    
    // For now, just close the modal
    this.closeInterviewModal();
  }
}