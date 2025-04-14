import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ProfileData {
  firstName: string;
  lastName: string;
  experience: string;
  title: string;
  education: string;
  location: string;
  company: string;
  portfolio: string;
  skills: string[];
}
@Component({
  selector: 'app-jobseeker-profile',
  standalone: true,
  imports: [SidebarComponent,FormsModule,CommonModule],
  templateUrl: './jobseeker-profile.component.html',
  styleUrl: './jobseeker-profile.component.css'
})
export class JobseekerProfileComponent implements OnInit {
  newSkill: string = '';
  profileData: ProfileData = {
    firstName: 'Loyce',
    lastName: 'Smith',
    experience: '5',
    title: 'Senior Developer',
    education: 'Bachelor of Science',
    location: 'New York, NY',
    company: 'Tech Solutions Inc.',
    portfolio: 'https://portfolio.loyce.dev',
    skills: ['Express', 'JS', 'React', 'CSS']
  };

  
  isEditing = false;
  
  selectedFile: File | null = null;
  
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  private originalData: ProfileData | null = null;

  constructor() {}

  ngOnInit(): void {}


  toggleEdit(): void {
    if (this.isEditing) {
    
      this.saveChanges();
    } else {
    
      this.originalData = JSON.parse(JSON.stringify(this.profileData));
      this.isEditing = true;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        this.removeSelectedFile();
        return;
      }
      
      // Check file type
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(fileType || '')) {
        alert('Invalid file type. Please upload PDF, DOC, or DOCX files.');
        this.removeSelectedFile();
        return;
      }
      
      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }
  
  // Remove selected file
  removeSelectedFile(): void {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  saveChanges(): void {
 
    console.log('Saving profile data:', this.profileData);
    
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
      
    }
    this.isEditing = false;
    
   
    this.originalData = null;
    

    alert('Profile updated successfully!');
  }


  cancelChanges(): void {
    if (this.originalData) {
      this.profileData = JSON.parse(JSON.stringify(this.originalData));
    }
    this.isEditing = false;
    this.originalData = null;
  }

  
  addSkill(): void {
    if (this.newSkill && !this.profileData.skills.includes(this.newSkill)) {
      this.profileData.skills.push(this.newSkill);
      this.newSkill = ''; // Clear the input
    }
  }

 
  removeSkill(index: number): void {
    this.profileData.skills.splice(index, 1);
  }
}