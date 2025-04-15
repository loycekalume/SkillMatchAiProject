import { Component } from '@angular/core';
import { EmployerDashboardComponent } from '../employer-dashboard/employer-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScheduleModalService } from '../../services/schedule-modal.service';
import { InterviewmodalComponent } from '../interviewmodal/interviewmodal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Candidate {
  name: string;
  initials: string;
  position: string;
  match: number;
  skills: string[];
}

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [SidebarComponent, InterviewmodalComponent, CommonModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css', '../employer-dashboard/employer-dashboard.component.css']
})
export class CandidatesComponent {
  showInterviewModal = false;
  selectedCandidate = '';
  
  // Search and filter properties
  searchText = '';
  showFilterDropdown = false;
  
  // Filter options
  filterOptions = {
    matchPercentage: [
      { label: 'All', value: 0, selected: true },
      { label: '90%+', value: 90, selected: false },
      { label: '80%+', value: 80, selected: false },
      { label: '70%+', value: 70, selected: false }
    ],
    skills: [
      { label: 'React', selected: false },
      { label: 'Angular', selected: false },
      { label: 'Vue', selected: false },
      { label: 'JavaScript', selected: false },
      { label: 'HTML/CSS', selected: false },
      { label: 'Node.js', selected: false },
      { label: 'UI/UX', selected: false }
    ],
    position: [
      { label: 'All Positions', selected: true },
      { label: 'Frontend Developer', selected: false },
      { label: 'Backend Developer', selected: false },
      { label: 'Full Stack Developer', selected: false },
      { label: 'UX Designer', selected: false },
      { label: 'Product Manager', selected: false }
    ]
  };
  
  // Original and filtered candidates
  allCandidates: Candidate[] = [
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
  
  candidates: Candidate[] = [...this.allCandidates];
  
  // Toggle filter dropdown
  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }
  
  // Apply search filter
  applySearch(): void {
    this.applyFilters();
  }
  
  // Toggle a filter option
  toggleFilter(category: string, index: number): void {
    if (category === 'matchPercentage') {
      // For match percentage, only one can be selected at a time
      this.filterOptions.matchPercentage.forEach((option, i) => {
        option.selected = i === index;
      });
    } else if (category === 'position') {
      // For position, only one can be selected at a time
      this.filterOptions.position.forEach((option, i) => {
        option.selected = i === index;
      });
    } else {
      // For skills, multiple can be selected
      this.filterOptions.skills[index].selected = !this.filterOptions.skills[index].selected;
    }
    
    this.applyFilters();
  }
  
  // Clear all filters
  clearFilters(): void {
    // Reset match percentage to "All"
    this.filterOptions.matchPercentage.forEach((option, i) => {
      option.selected = i === 0;
    });
    
    // Reset position to "All Positions"
    this.filterOptions.position.forEach((option, i) => {
      option.selected = i === 0;
    });
    
    // Reset all skills to unselected
    this.filterOptions.skills.forEach(option => {
      option.selected = false;
    });
    
    this.applyFilters();
  }
  
  // Apply all filters and search
  applyFilters(): void {
    // Start with all candidates
    let filteredCandidates = [...this.allCandidates];
    
    // Apply search filter
    if (this.searchText.trim()) {
      const searchTerm = this.searchText.toLowerCase();
      filteredCandidates = filteredCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm) ||
        candidate.position.toLowerCase().includes(searchTerm) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply match percentage filter
    const selectedMatch = this.filterOptions.matchPercentage.find(option => option.selected);
    if (selectedMatch && selectedMatch.value > 0) {
      filteredCandidates = filteredCandidates.filter(candidate => 
        candidate.match >= selectedMatch.value
      );
    }
    
    // Apply position filter
    const selectedPosition = this.filterOptions.position.find(option => option.selected);
    if (selectedPosition && selectedPosition.label !== 'All Positions') {
      filteredCandidates = filteredCandidates.filter(candidate => 
        candidate.position.includes(selectedPosition.label)
      );
    }
    
    // Apply skills filters
    const selectedSkills = this.filterOptions.skills
      .filter(option => option.selected)
      .map(option => option.label);
    
    if (selectedSkills.length > 0) {
      filteredCandidates = filteredCandidates.filter(candidate => 
        selectedSkills.some(skill => 
          candidate.skills.some(candidateSkill => 
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    
    // Sort by match percentage (highest first)
    filteredCandidates.sort((a, b) => b.match - a.match);
    
    // Update the candidates list
    this.candidates = filteredCandidates;
  }
  
  // Check if any filters are active
  get hasActiveFilters(): boolean {
    return (
      this.filterOptions.matchPercentage.some(option => option.selected && option.value > 0) ||
      this.filterOptions.position.some(option => option.selected && option.label !== 'All Positions') ||
      this.filterOptions.skills.some(option => option.selected)
    );
  }
  
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