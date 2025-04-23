import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService, ProfileData, Skill } from '../../services/jobseekerprofileservice.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-jobseeker-profile',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './jobseeker-profile.component.html',
  styleUrl: './jobseeker-profile.component.css'
})
export class JobseekerProfileComponent implements OnInit {
  newSkill: string = '';
  profileData: ProfileData = {
    firstName: '',
    lastName: '',
    experience: '',
    title: '',
    education: '',
    location: '',
    company: '',
    portfolio: '',
    skills: []
  };
  
  allSkills: Skill[] = [];
  profileId: string = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  private originalData: ProfileData | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.profileId = currentUser.id;
      this.profileData.firstName = currentUser.firstName;
      this.profileData.lastName = currentUser.lastName;
      this.loadProfile();
      this.loadSkills();
    } else {
      this.errorMessage = 'User not authenticated. Please log in first.';
    }
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getProfile(this.profileId).subscribe({
      next: (apiProfile) => {
        // Convert API profile to frontend format
        // Skills will be loaded separately
        this.profileData = this.profileService.convertToFrontendFormat(
          apiProfile, 
          this.profileData.skills
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = 'Failed to load profile data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  loadSkills(): void {
    this.profileService.getAllSkills().subscribe({
      next: (skills) => {
        this.allSkills = skills;
        // For demo - let's add some sample skills to profile
        // In a real app, you would have a separate endpoint to get user skills
        if (this.profileData.skills.length === 0) {
          this.profileData.skills = ['JavaScript', 'React', 'CSS'];
        }
      },
      error: (err) => {
        console.error('Error loading skills:', err);
      }
    });
  }

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
  
  removeSelectedFile(): void {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  saveChanges(): void {
    this.isLoading = true;
    
    // Convert to API format
    const apiData = this.profileService.convertToApiFormat(this.profileData);
    
    // Update profile
    this.profileService.updateProfile(this.profileId, apiData).subscribe({
      next: (response) => {
        console.log('Profile updated:', response);
        
        // If there's a file to upload
        if (this.selectedFile) {
          this.uploadResume();
        } else {
          this.finalizeSave();
        }
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.errorMessage = 'Failed to update profile. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  uploadResume(): void {
    if (!this.selectedFile) return;
    
    this.profileService.uploadResume(this.profileId, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Resume uploaded:', response);
        this.finalizeSave();
      },
      error: (err) => {
        console.error('Error uploading resume:', err);
        this.errorMessage = 'Profile updated but resume upload failed. Please try again later.';
        this.finalizeSave();
      }
    });
  }

  finalizeSave(): void {
    this.isLoading = false;
    this.isEditing = false;
    this.originalData = null;
    this.removeSelectedFile();
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
    if (!this.newSkill || this.newSkill.trim() === '') return;
    
    // Check if the skill already exists in the profile
    if (this.profileData.skills.includes(this.newSkill)) {
      alert('This skill is already added to your profile');
      this.newSkill = '';
      return;
    }
    
    // Check if the skill exists in our system
    const existingSkill = this.allSkills.find(s => s.skill_name.toLowerCase() === this.newSkill.toLowerCase());
    
    if (existingSkill) {
      // Add existing skill to profile
      this.profileData.skills.push(existingSkill.skill_name);
      this.newSkill = '';
    } else {
      // Create a new skill in the system
      this.profileService.createSkill(this.newSkill).subscribe({
        next: (response) => {
          console.log('New skill created:', response);
          this.profileData.skills.push(this.newSkill);
          this.allSkills.push(response.skill);
          this.newSkill = '';
        },
        error: (err) => {
          console.error('Error creating skill:', err);
          if (err.status === 400 && err.error.message === 'Skill already exists') {
            // If the error is that the skill already exists, just add it to the profile
            this.profileData.skills.push(this.newSkill);
            this.newSkill = '';
          } else {
            alert('Failed to add skill. Please try again.');
          }
        }
      });
    }
  }
  
  removeSkill(index: number): void {
    this.profileData.skills.splice(index, 1);
  }
}