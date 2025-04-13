import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule ,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationmodalComponent } from '../applicationmodal/applicationmodal.component';
interface Job {
  title: string;
  matchPercentage: string;
  type: string;
  location: string;
  skills: string[];
  company: string;
}
@Component({
  selector: 'app-jobmatches',
  standalone: true,
  imports: [RouterModule,SidebarComponent,CommonModule,ApplicationmodalComponent],
  templateUrl: './jobmatches.component.html',
  styleUrl: './jobmatches.component.css'
})
export class JobmatchesComponent {
  showApplicationModal = false;
  selectedJob: Job | null = null;

  jobs: Job[] = [
    {
      title: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      type: 'Full-time',
      location: 'Remote',
      matchPercentage: '95%',
      skills: ['React', 'Js', 'Angular', 'Express']
    },
    {
      title: 'Fullstack Developer',
      company: 'InnovateSoft',
      type: 'Full-time',
      location: 'Remote',
      matchPercentage: '90%',
      skills: ['React', 'Angular', 'Express']
    },
    {
      title: 'React Native Developer',
      company: 'MobileApps Co.',
      type: 'Full-time',
      location: 'Remote',
      matchPercentage: '88%',
      skills: ['React Native', 'JavaScript', 'TypeScript']
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignHub',
      type: 'Full-time',
      location: 'Remote',
      matchPercentage: '85%',
      skills: ['Figma', 'Adobe XD', 'Sketch']
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      type: 'Contract',
      location: 'Remote',
      matchPercentage: '82%',
      skills: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      title: 'Backend Developer',
      company: 'DataFlow Solutions',
      type: 'Full-time',
      location: 'Hybrid',
      matchPercentage: '80%',
      skills: ['Node.js', 'Python', 'MongoDB']
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
    console.log('Application submitted from matches page:', formData);
  }
}
