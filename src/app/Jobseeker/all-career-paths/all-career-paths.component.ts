import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
interface CareerPath {
  id: number;
  title: string;
  matchPercentage: string;
  demand: 'High' | 'Medium' | 'Low';
  skills: string[];
  description: string;
  averageSalary: string;
  growthRate: string;
}
@Component({
  selector: 'app-all-career-paths',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './all-career-paths.component.html',
  styleUrl: './all-career-paths.component.css'
})
export class AllCareerPathsComponent implements OnInit{
  careerPaths: CareerPath[] = [];
  filteredPaths: CareerPath[] = [];
  searchTerm: string = '';
  selectedDemand: string = 'All';
  selectedMatchRange: string = 'All';
  
  demandOptions = ['All', 'High', 'Medium', 'Low'];
  matchRangeOptions = ['All', '90-100%', '80-89%', '70-79%', 'Below 70%'];

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch this data from a service
    this.careerPaths = [
      {
        id: 1,
        title: 'Frontend Development',
        matchPercentage: '95%',
        demand: 'High',
        skills: ['React', 'JS', 'Angular', 'HTML'],
        description: 'Frontend developers build the visible parts of websites and applications that users interact with directly.',
        averageSalary: '$85,000 - $120,000',
        growthRate: '15% annually'
      },
      {
        id: 2,
        title: 'Senior Developer',
        matchPercentage: '95%',
        demand: 'High',
        skills: ['React', 'JS', 'Angular', 'HTML'],
        description: 'Senior developers lead development teams and architect complex software solutions.',
        averageSalary: '$110,000 - $150,000',
        growthRate: '12% annually'
      },
      {
        id: 3,
        title: 'Backend Development',
        matchPercentage: '88%',
        demand: 'High',
        skills: ['Node.js', 'Python', 'Java', 'SQL'],
        description: 'Backend developers build and maintain the server-side of web applications.',
        averageSalary: '$90,000 - $130,000',
        growthRate: '13% annually'
      },
      {
        id: 4,
        title: 'Full Stack Development',
        matchPercentage: '92%',
        demand: 'High',
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        description: 'Full stack developers work on both client and server sides of web applications.',
        averageSalary: '$95,000 - $140,000',
        growthRate: '17% annually'
      },
      {
        id: 5,
        title: 'DevOps Engineer',
        matchPercentage: '82%',
        demand: 'High',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        description: 'DevOps engineers bridge development and operations to improve deployment efficiency.',
        averageSalary: '$100,000 - $145,000',
        growthRate: '20% annually'
      },
      {
        id: 6,
        title: 'Data Scientist',
        matchPercentage: '78%',
        demand: 'High',
        skills: ['Python', 'R', 'SQL', 'Machine Learning'],
        description: 'Data scientists analyze and interpret complex data to help organizations make better decisions.',
        averageSalary: '$105,000 - $150,000',
        growthRate: '22% annually'
      },
      {
        id: 7,
        title: 'UX/UI Designer',
        matchPercentage: '85%',
        demand: 'Medium',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        description: 'UX/UI designers create intuitive, user-friendly interfaces for digital products.',
        averageSalary: '$80,000 - $120,000',
        growthRate: '14% annually'
      },
      {
        id: 8,
        title: 'Mobile App Developer',
        matchPercentage: '80%',
        demand: 'Medium',
        skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
        description: 'Mobile app developers create applications for iOS and Android platforms.',
        averageSalary: '$85,000 - $125,000',
        growthRate: '16% annually'
      }
    ];
    
    this.filteredPaths = [...this.careerPaths];
  }
  
  applyFilters(): void {
    this.filteredPaths = this.careerPaths.filter(path => {
      // Filter by search term
      const matchesSearch = this.searchTerm === '' || 
        path.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        path.skills.some(skill => skill.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      // Filter by demand
      const matchesDemand = this.selectedDemand === 'All' || path.demand === this.selectedDemand;
      
      let matchesPercentage = true;
      const percentage = parseInt(path.matchPercentage);
      
      if (this.selectedMatchRange === '90-100%') {
        matchesPercentage = percentage >= 90 && percentage <= 100;
      } else if (this.selectedMatchRange === '80-89%') {
        matchesPercentage = percentage >= 80 && percentage < 90;
      } else if (this.selectedMatchRange === '70-79%') {
        matchesPercentage = percentage >= 70 && percentage < 80;
      } else if (this.selectedMatchRange === 'Below 70%') {
        matchesPercentage = percentage < 70;
      }
      
      return matchesSearch && matchesDemand && matchesPercentage;
    });
  }
  
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedDemand = 'All';
    this.selectedMatchRange = 'All';
    this.filteredPaths = [...this.careerPaths];
  }

}
