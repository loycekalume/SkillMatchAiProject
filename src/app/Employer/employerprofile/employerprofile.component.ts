import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EmployerProfile {
  profile_id: number;
  user_id: number;
  company_name: string;
  company_size: string;
  industry: string;
  location:string
  company_description: string;
  website_url: string;
  logo_url?: string;
}
@Component({
  selector: 'app-employerprofile',
  standalone: true,
  imports: [SidebarComponent,CommonModule,FormsModule],
  templateUrl: './employerprofile.component.html',
  styleUrl: './employerprofile.component.css'
})
export class EmployerprofileComponent {
  profile: EmployerProfile = {
    profile_id: 1,
    user_id: 101,
    company_name: 'SkillMatch Technologies',
    company_size: '50-100',
    industry: 'Information Technology',
    location: 'Nyeri',
    company_description: 'SkillMatch Technologies is a leading provider of AI-powered recruitment solutions, helping companies find the perfect candidates based on skills and experience.',
    website_url: 'https://skillsmatchai.vercel.app/',
    // logo_url: '/assets/images/company-logo.png'
  };

  
  isEditMode = false;
  
  editableProfile: EmployerProfile = { ...this.profile };
  
 
  companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ];
  
  
  industries = [
    'Information Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Marketing',
    'Consulting',
    'Entertainment',
    'Transportation',
    'Construction',
    'Agriculture',
    'Energy',
    'Telecommunications',
    'Hospitality'
  ];
  
  constructor() { }

  ngOnInit(): void {
    
    this.loadProfileData();
  }

  loadProfileData(): void {
    
    console.log('Loading profile data...');
    
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
    
      this.editableProfile = { ...this.profile };
    } else {
      // Entering edit mode
      this.editableProfile = { ...this.profile };
    }
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
  
    console.log('Saving profile...', this.editableProfile);
   
    this.profile = { ...this.editableProfile };
    this.isEditMode = false;
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
     
      const reader = new FileReader();
      reader.onload = () => {
        this.editableProfile.logo_url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
