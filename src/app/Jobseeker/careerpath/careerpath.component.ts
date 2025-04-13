import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CareerPath {
  id: number;
  title: string;
  matchPercentage: string;
  demand: string;
  skills: string[];
}
@Component({
  selector: 'app-careerpath',
  standalone: true,
  imports: [SidebarComponent,RouterModule,CommonModule],
  templateUrl: './careerpath.component.html',
  styleUrl: './careerpath.component.css'
})
export class CareerpathComponent {
  careerPaths: CareerPath[] = [
    {
      id: 1,
      title: 'Frontend Development',
      matchPercentage: '95%',
      demand: 'High',
      skills: ['React', 'JS', 'Angular', 'HTML']
    },
    {
      id: 2,
      title: 'Senior Developer',
      matchPercentage: '95%',
      demand: 'High',
      skills: ['React', 'JS', 'Angular', 'HTML']
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Method to handle the explore button click
  exploreCareerPath(id: number): void {
    this.router.navigate(['/career-paths', id]);
  }
}
  


