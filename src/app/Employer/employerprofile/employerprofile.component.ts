import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployerProfile, EmployerProfileService } from '../../services/employerprofileservice.service';

@Component({
  selector: 'app-employerprofile',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employerprofile.component.html',
  styleUrl: './employerprofile.component.css'
})
export class EmployerprofileComponent implements OnInit {
  profile: EmployerProfile = {
    profile_id: '',
    user_id: 0,
    company_name: '',
    company_size: '',
    industry: '',
    location: '',
    company_description: '',
    website_url: '',
    logo_url: ''
  };

  isEditMode = false;
  editableProfile: EmployerProfile = { ...this.profile };
  isLoading = true;
  error = '';
  logoFile: File | null = null;
  profileId: string | null = null;

  companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  industries = ['Information Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Marketing', 'Consulting', 'Entertainment', 'Transportation', 'Construction', 'Agriculture', 'Energy', 'Telecommunications', 'Hospitality'];

  constructor(private profileService: EmployerProfileService) {}
  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.profile.user_id = user.id;
      this.editableProfile.user_id = user.id;
    }
  
    // Just load profile data directly - it will fetch the current user's profile
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading = true;
    this.error = '';
  
    // Use getUserProfile() instead of getProfileById()
    this.profileService.getUserProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.profileId = data.profile_id;
        this.editableProfile = { ...this.profile };
        this.isLoading = false;
        localStorage.setItem('employer_profile_id', data.profile_id.toString());
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        if (err.status === 404) {
          // Profile doesn't exist yet
          this.error = '';
          this.isEditMode = true;
        } else {
          this.error = 'Failed to load profile. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }
  toggleEditMode(): void {
    this.editableProfile = { ...this.profile };
    this.logoFile = null;
    this.isEditMode = !this.isEditMode;
  }
  saveProfile(): void {
    this.isLoading = true;
    this.error = '';
  
    const userStr = localStorage.getItem('user');
    if (userStr && !this.editableProfile.user_id) {
      const user = JSON.parse(userStr);
      this.editableProfile.user_id = user.id;
    }
  
    if (this.profileId) {
      // Update existing profile
      this.profileService.updateProfile(this.profileId, this.editableProfile).subscribe({
        next: (response) => {
          this.profile = response.profile;
          this.profileId = this.profile.profile_id;
          this.isEditMode = false;
          this.isLoading = false;
          localStorage.setItem('employer_profile_id', this.profile.profile_id.toString());
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.error = 'Failed to update profile. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      // Create new profile
      this.profileService.createProfile(this.editableProfile).subscribe({
        next: (response) => {
          this.profile = response.profile;
          this.profileId = this.profile.profile_id;
          this.isEditMode = false;
          this.isLoading = false;
          localStorage.setItem('employer_profile_id', this.profile.profile_id.toString());
        },
        error: (err) => {
          console.error('Error creating profile:', err);
          
          // Check if error is about duplicate key
          if (err.error && err.error.includes && err.error.includes('duplicate key value')) {
            // User already has a profile, so let's fetch it instead
            this.profileService.getUserProfile().subscribe({
              next: (profile) => {
                this.profile = profile;
                this.profileId = profile.profile_id;
                localStorage.setItem('employer_profile_id', profile.profile_id.toString());
                this.isEditMode = false;
                this.isLoading = false;
                this.error = 'You already have a profile. It has been loaded.';
              },
              error: (profileErr) => {
                console.error('Error fetching existing profile:', profileErr);
                this.error = 'You already have a profile, but we could not load it. Please refresh the page.';
                this.isLoading = false;
              }
            });
          } else {
            this.error = 'Failed to create profile. Please try again.';
            this.isLoading = false;
          }
        }
      });
    }
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editableProfile.logo_url = reader.result as string;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }
}
