import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationmodalComponent } from '../applicationmodal/applicationmodal.component';
import { FormsModule } from '@angular/forms';

interface Job {
  title: string;
  matchPercentage: string;
  type: string;
  location: string;
  skills: string[];
  company: string;
}

interface FilterOption {
  category: string;
  options: string[];
}

@Component({
  selector: 'app-jobmatches',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule, ApplicationmodalComponent, FormsModule],
  templateUrl: './jobmatches.component.html',
  styleUrl: './jobmatches.component.css'
})
export class JobmatchesComponent implements OnInit {
  showApplicationModal = false;
  selectedJob: Job | null = null;
  
  // Search and filter properties
  searchText: string = '';
  showFilterModal: boolean = false;
  activeFilters: string[] = ['Remote', 'Full-time', 'React']; // Default active filters
  sortOption: string = 'match'; // Default sort option
  
  // Original and filtered jobs lists
  allJobs: Job[] = [];
  jobs: Job[] = [];
  
  // Filter options
  filterOptions: FilterOption[] = [
    {
      category: 'Job Type',
      options: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
    },
    {
      category: 'Location',
      options: ['Remote', 'Hybrid', 'On-site']
    },
    {
      category: 'Skills',
      options: ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'SQL', 'AWS', 'Docker']
    }
  ];
  
  // Selected filters in the modal
  selectedFilters: { [key: string]: string[] } = {
    'Job Type': [],
    'Location': [],
    'Skills': []
  };

  constructor() {}

  ngOnInit(): void {
    // Initialize with sample data
    this.allJobs = [
      {
        title: 'Senior Frontend Engineer',
        company: 'TechCorp Inc.',
        type: 'Full-time',
        location: 'Remote',
        matchPercentage: '95%',
        skills: ['React', 'JavaScript', 'Angular', 'Express']
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
    
    // Initialize selected filters based on active filters
    this.initializeSelectedFilters();
    
    // Apply initial filtering
    this.applyFilters();
  }
  
  // Initialize selected filters based on active filters
  initializeSelectedFilters(): void {
    this.activeFilters.forEach(filter => {
      for (const category in this.selectedFilters) {
        if (this.filterOptions.find(option => option.category === category)?.options.includes(filter)) {
          this.selectedFilters[category].push(filter);
        }
      }
    });
  }
  
  // Search functionality - now applies in real-time
  onSearch(): void {
    this.applyFilters();
  }
  
  // Clear search text and reapply filters
  clearSearch(): void {
    this.searchText = '';
    this.onSearch(); // Apply filters immediately after clearing
  }
  
  // Toggle filter modal
  toggleFilterModal(): void {
    this.showFilterModal = !this.showFilterModal;
  }
  
  // Apply filters and search
  applyFilters(): void {
    // Start with all jobs
    let filteredJobs = [...this.allJobs];
    
    // Apply search filter if search text exists
    if (this.searchText.trim()) {
      const searchLower = this.searchText.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.toLowerCase().includes(searchLower) || 
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply active filters
    if (this.activeFilters.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        // Check if job matches any active filter
        return this.activeFilters.some(filter => 
          job.type === filter || 
          job.location === filter || 
          job.skills.includes(filter)
        );
      });
    }
    
    // Apply sorting
    this.applySorting(filteredJobs);
    
    // Update jobs list
    this.jobs = filteredJobs;
  }
  
  // Apply sorting based on selected option
  applySorting(jobs: Job[]): void {
    switch (this.sortOption) {
      case 'match':
        jobs.sort((a, b) => {
          const percentA = parseInt(a.matchPercentage.replace('%', ''));
          const percentB = parseInt(b.matchPercentage.replace('%', ''));
          return percentB - percentA;
        });
        break;
      case 'recent':
        // In a real app, you would sort by date
        // For now, we'll just keep the current order
        break;
      case 'salary':
        // In a real app, you would sort by salary
        // For now, we'll just sort alphabetically by company
        jobs.sort((a, b) => a.company.localeCompare(b.company));
        break;
    }
  }
  
  // Handle sort change
  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value;
    this.applyFilters();
  }
  
  // Add a filter
  addFilter(filter: string): void {
    if (!this.activeFilters.includes(filter)) {
      this.activeFilters.push(filter);
      this.applyFilters();
    }
  }
  
  // Remove a filter
  removeFilter(filter: string): void {
    const index = this.activeFilters.indexOf(filter);
    if (index !== -1) {
      this.activeFilters.splice(index, 1);
      
      // Also remove from selected filters
      for (const category in this.selectedFilters) {
        const filterIndex = this.selectedFilters[category].indexOf(filter);
        if (filterIndex !== -1) {
          this.selectedFilters[category].splice(filterIndex, 1);
        }
      }
      
      this.applyFilters();
    }
  }
  
  // Clear all filters
  clearAllFilters(): void {
    this.activeFilters = [];
    
    // Clear selected filters
    for (const category in this.selectedFilters) {
      this.selectedFilters[category] = [];
    }
    
    this.applyFilters();
  }
  
  // Toggle a filter in the modal
  toggleFilter(category: string, option: string): void {
    const index = this.selectedFilters[category].indexOf(option);
    if (index === -1) {
      this.selectedFilters[category].push(option);
    } else {
      this.selectedFilters[category].splice(index, 1);
    }
  }
  
  // Apply filters from modal
  applyModalFilters(): void {
    // Clear active filters
    this.activeFilters = [];
    
    // Add all selected filters to active filters
    for (const category in this.selectedFilters) {
      this.activeFilters.push(...this.selectedFilters[category]);
    }
    
    // Apply filters
    this.applyFilters();
    
    // Close modal
    this.showFilterModal = false;
  }
  
  // Check if a filter is selected in the modal
  isFilterSelected(category: string, option: string): boolean {
    return this.selectedFilters[category].includes(option);
  }

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