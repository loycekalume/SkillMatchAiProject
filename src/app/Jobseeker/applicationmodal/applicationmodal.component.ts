import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicationmodal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './applicationmodal.component.html',
  styleUrl: './applicationmodal.component.css'
})
export class ApplicationmodalComponent {
  @Input() isVisible = false;
  @Input() jobTitle = '';
  @Input() companyName = '';
  @Input() jobSkills: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  
  applicationForm: FormGroup;
  resumeFileName: string = '';
  coverLetterFileName: string = '';
  
  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      experience: ['', Validators.required],
      linkedInProfile: [''],
      portfolioUrl: [''],
      resume: [null, Validators.required],
      coverLetter: [null],
      additionalInfo: ['']
    });
  }
  
  ngOnInit(): void {
  }
  
  closeModal(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.close.emit();
  }
  
  onResumeSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.resumeFileName = file.name;
      this.applicationForm.patchValue({
        resume: file
      });
    }
  }
  
  onCoverLetterSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverLetterFileName = file.name;
      this.applicationForm.patchValue({
        coverLetter: file
      });
    }
  }
  
  submitApplication(): void {
    if (this.applicationForm.valid) {
      const formData = new FormData();
      
      // Add form fields to FormData
      Object.keys(this.applicationForm.controls).forEach(key => {
        const control = this.applicationForm.get(key);
        if (control?.value) {
          formData.append(key, control.value);
        }
      });
      
      // Add job details
      formData.append('jobTitle', this.jobTitle);
      formData.append('companyName', this.companyName);
      
      this.submit.emit(formData);
      this.closeModal();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.applicationForm.controls).forEach(key => {
        this.applicationForm.get(key)?.markAsTouched();
      });
    }
  }
}
