import { Component } from '@angular/core';
import { EmployerDashboardComponent } from '../employer-dashboard/employer-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScheduleModalService } from '../../services/schedule-modal.service';
import { InterviewmodalComponent } from '../interviewmodal/interviewmodal.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [SidebarComponent ,InterviewmodalComponent,CommonModule],
  templateUrl: './candidates.component.html',
  styleUrls:['./candidates.component.css','../employer-dashboard/employer-dashboard.component.css'] 
})
export class CandidatesComponent {
  showInterviewModal = false;
  selectedCandidate = '';
  candidates = [
    {
      name: 'John Doe',
      initials: 'JD',
      position: 'Backend Manager',
      match: 85,
      skills: ['React', 'JS', 'Angular', 'HTML']
    },
    {
      name: 'Alice Smith',
      initials: 'AS',
      position: 'Layout Manager',
      match: 80,
      skills: ['React', 'JS', 'Angular', 'HTML']
    },
    {
      name: 'Robert Johnson',
      initials: 'RJ',
      position: 'Frontend Developer',
      match: 78,
      skills: ['React', 'Vue', 'CSS', 'HTML']
    },
    {
      name: 'Emily Wilson',
      initials: 'EW',
      position: 'UX Designer',
      match: 75,
      skills: ['Figma', 'Sketch', 'UI', 'Prototyping']
    },
    {
      name: 'Michael Kim',
      initials: 'MK',
      position: 'Full Stack Developer',
      match: 72,
      skills: ['Node.js', 'React', 'MongoDB', 'Express']
    },
    {
      name: 'Sarah Parker',
      initials: 'SP',
      position: 'Product Manager',
      match: 70,
      skills: ['Agile', 'Scrum', 'Jira', 'Roadmapping']
    }
  ];
  
  openModal(candidateName: string): void {
    this.selectedCandidate = candidateName;
    this.showInterviewModal = true;
  }
  
  closeModal(): void {
    this.showInterviewModal = false;
  }
  
  handleInterviewScheduled(interviewData: any): void {
    console.log('Interview scheduled:', interviewData);
   
  }
}
