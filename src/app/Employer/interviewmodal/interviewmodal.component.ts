import { CommonModule } from '@angular/common';
import { Component, Input, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-interviewmodal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './interviewmodal.component.html',
  styleUrl: './interviewmodal.component.css'
})
export class InterviewmodalComponent {
  @Input() isVisible = false;
  @Input() candidateName = '';
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  
  interviewForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.interviewForm = this.fb.group({
      candidateName: ['', Validators.required],
      interviewDate: ['', Validators.required],
      interviewTime: ['', Validators.required],
      duration: ['60', Validators.required],
      interviewType: ['video', Validators.required],
      interviewers: [''],
      notes: ['']
    });
  }
  
  ngOnInit(): void {
    // Set minimum date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    // Set default time to current time rounded to nearest half hour
    const hours = today.getHours();
    const minutes = today.getMinutes() >= 30 ? '30' : '00';
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
    
    this.interviewForm.patchValue({
      interviewDate: formattedDate,
      interviewTime: formattedTime
    });
  }
  
  ngOnChanges(): void {
    if (this.isVisible && this.candidateName) {
      this.interviewForm.patchValue({
        candidateName: this.candidateName
      });
    }
  }
  
  closeModal(event: Event): void {
    event.preventDefault();
    this.close.emit();
  }
  
  scheduleInterview(): void {
    if (this.interviewForm.valid) {
      // Combine date and time
      const formData = this.interviewForm.value;
      const dateTime = new Date(`${formData.interviewDate}T${formData.interviewTime}`);
      
      const interviewData = {
        ...formData,
        dateTime: dateTime
      };
      
      this.submit.emit(interviewData);
      this.close.emit();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.interviewForm.controls).forEach(key => {
        this.interviewForm.get(key)?.markAsTouched();
      });
    }
  }
}


