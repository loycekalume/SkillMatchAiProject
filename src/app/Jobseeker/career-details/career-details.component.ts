import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
interface CareerPath {
  id: number;
  title: string;
  matchPercentage: string;
  demand: 'High' | 'Medium' | 'Low';
  skills: Skill[];
  description: string;
  averageSalary: string;
  growthRate: string;
  educationRequirements: string[];
  certifications: Certification[];
  jobOutlook: string;
  careerProgression: ProgressionStep[];
  relatedCareers: RelatedCareer[];
  jobListings: JobListing[];
}

interface Skill {
  name: string;
  importance: 'Essential' | 'Important' | 'Helpful';
  level: number; // 1-5 scale
}

interface Certification {
  name: string;
  provider: string;
  duration: string;
  description: string;
  url: string;
}

interface ProgressionStep {
  title: string;
  yearsExperience: string;
  salary: string;
  description: string;
}

interface RelatedCareer {
  id: number;
  title: string;
  matchPercentage: string;
}

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  url: string;
}
@Component({
  selector: 'app-career-details',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './career-details.component.html',
  styleUrl: './career-details.component.css'
})
export class CareerDetailsComponent {
  careerPath: CareerPath | null = null;
  activeTab: string = 'overview';
  loading: boolean = true;
  
  // Mock data for the career paths
  careerPaths: CareerPath[] = [
    {
      id: 1,
      title: 'Frontend Development',
      matchPercentage: '95%',
      demand: 'High',
      skills: [
        { name: 'React', importance: 'Essential', level: 5 },
        { name: 'JavaScript', importance: 'Essential', level: 5 },
        { name: 'HTML/CSS', importance: 'Essential', level: 4 },
        { name: 'TypeScript', importance: 'Important', level: 4 },
        { name: 'Redux', importance: 'Important', level: 3 },
        { name: 'Responsive Design', importance: 'Essential', level: 4 },
        { name: 'Git', importance: 'Important', level: 3 },
        { name: 'Testing (Jest, Cypress)', importance: 'Important', level: 3 },
        { name: 'Webpack', importance: 'Helpful', level: 2 },
        { name: 'UI/UX Principles', importance: 'Helpful', level: 3 }
      ],
      description: 'Frontend developers build the visible parts of websites and applications that users interact with directly. They implement designs, create interactive features, and ensure a smooth user experience across different devices and browsers.',
      averageSalary: '$85,000 - $120,000',
      growthRate: '15% annually',
      educationRequirements: [
        'Bachelor\'s degree in Computer Science or related field (preferred but not required)',
        'Coding bootcamp with frontend focus',
        'Self-taught with strong portfolio'
      ],
      certifications: [
        {
          name: 'Meta Frontend Developer Professional Certificate',
          provider: 'Coursera',
          duration: '6-8 months',
          description: 'Comprehensive program covering React, JavaScript, and web development fundamentals.',
          url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
        },
        {
          name: 'JavaScript Algorithms and Data Structures',
          provider: 'freeCodeCamp',
          duration: 'Self-paced',
          description: 'Learn JavaScript fundamentals, algorithms, and data structures.',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'
        },
        {
          name: 'Advanced React',
          provider: 'Pluralsight',
          duration: '10 hours',
          description: 'Deep dive into advanced React concepts and patterns.',
          url: 'https://www.pluralsight.com/courses/react-advanced'
        }
      ],
      jobOutlook: 'The demand for frontend developers continues to grow as businesses focus on creating better digital experiences. With the rise of mobile applications and progressive web apps, frontend skills are highly sought after across industries. The job market is expected to remain strong for the next decade.',
      careerProgression: [
        {
          title: 'Junior Frontend Developer',
          yearsExperience: '0-2 years',
          salary: '$60,000 - $85,000',
          description: 'Focus on implementing designs, learning frameworks, and building components under supervision.'
        },
        {
          title: 'Mid-level Frontend Developer',
          yearsExperience: '2-5 years',
          salary: '$85,000 - $110,000',
          description: 'Lead feature development, mentor juniors, and contribute to architectural decisions.'
        },
        {
          title: 'Senior Frontend Developer',
          yearsExperience: '5+ years',
          salary: '$110,000 - $140,000',
          description: 'Architect solutions, lead teams, and drive technical decisions for frontend systems.'
        },
        {
          title: 'Frontend Architect / Lead',
          yearsExperience: '8+ years',
          salary: '$130,000 - $160,000',
          description: 'Define frontend strategy, establish best practices, and oversee multiple teams or projects.'
        }
      ],
      relatedCareers: [
        { id: 4, title: 'Full Stack Developer', matchPercentage: '92%' },
        { id: 7, title: 'UX/UI Designer', matchPercentage: '85%' },
        { id: 8, title: 'Mobile App Developer', matchPercentage: '80%' }
      ],
      jobListings: [
        {
          id: 101,
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          salary: '$110,000 - $130,000',
          postedDate: '2 days ago',
          url: '#'
        },
        {
          id: 102,
          title: 'React Developer',
          company: 'InnovateSoft',
          location: 'New York, NY',
          salary: '$95,000 - $115,000',
          postedDate: '1 week ago',
          url: '#'
        },
        {
          id: 103,
          title: 'Frontend Engineer',
          company: 'WebSolutions',
          location: 'Remote',
          salary: '$90,000 - $120,000',
          postedDate: '3 days ago',
          url: '#'
        }
      ]
    },
    {
      id: 2,
      title: 'Senior Developer',
      matchPercentage: '95%',
      demand: 'High',
      skills: [
        { name: 'JavaScript', importance: 'Essential', level: 5 },
        { name: 'System Design', importance: 'Essential', level: 5 },
        { name: 'React', importance: 'Important', level: 4 },
        { name: 'Node.js', importance: 'Important', level: 4 },
        { name: 'Database Design', importance: 'Essential', level: 4 },
        { name: 'API Development', importance: 'Essential', level: 5 },
        { name: 'Team Leadership', importance: 'Important', level: 4 },
        { name: 'Code Review', importance: 'Essential', level: 5 },
        { name: 'DevOps', importance: 'Helpful', level: 3 },
        { name: 'Agile Methodologies', importance: 'Important', level: 4 }
      ],
      description: 'Senior developers lead development teams and architect complex software solutions. They mentor junior developers, make critical technical decisions, and ensure code quality and best practices across projects.',
      averageSalary: '$110,000 - $150,000',
      growthRate: '12% annually',
      educationRequirements: [
        'Bachelor\'s degree in Computer Science or related field (often required)',
        'Master\'s degree (beneficial for some positions)',
        'Extensive professional experience (can sometimes substitute for formal education)'
      ],
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          provider: 'Amazon Web Services',
          duration: '3-6 months preparation',
          description: 'Validates expertise in designing distributed systems on AWS.',
          url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
        },
        {
          name: 'Certified Scrum Master',
          provider: 'Scrum Alliance',
          duration: '2-day course + exam',
          description: 'Learn to facilitate Scrum processes and lead Agile development teams.',
          url: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster'
        },
        {
          name: 'Google Professional Cloud Architect',
          provider: 'Google Cloud',
          duration: '3-6 months preparation',
          description: 'Demonstrates ability to design, develop, and manage robust cloud architecture.',
          url: 'https://cloud.google.com/certification/cloud-architect'
        }
      ],
      jobOutlook: 'Senior developers are in high demand across all industries as companies seek experienced professionals who can lead teams and architect complex solutions. The shortage of senior talent means competitive salaries and excellent job security. Companies are increasingly willing to offer remote work options to attract senior developers.',
      careerProgression: [
        {
          title: 'Senior Developer',
          yearsExperience: '5-8 years',
          salary: '$110,000 - $140,000',
          description: 'Lead development efforts, mentor junior developers, and make architectural decisions.'
        },
        {
          title: 'Lead Developer / Team Lead',
          yearsExperience: '8-12 years',
          salary: '$130,000 - $160,000',
          description: 'Manage a team of developers, coordinate with stakeholders, and oversee multiple projects.'
        },
        {
          title: 'Software Architect',
          yearsExperience: '10+ years',
          salary: '$150,000 - $180,000',
          description: 'Design system architecture, establish technical standards, and guide implementation across teams.'
        },
        {
          title: 'CTO / VP of Engineering',
          yearsExperience: '15+ years',
          salary: '$180,000 - $250,000+',
          description: 'Set technical vision, manage engineering organization, and align technology with business goals.'
        }
      ],
      relatedCareers: [
        { id: 4, title: 'Full Stack Developer', matchPercentage: '90%' },
        { id: 5, title: 'DevOps Engineer', matchPercentage: '85%' },
        { id: 3, title: 'Backend Developer', matchPercentage: '88%' }
      ],
      jobListings: [
        {
          id: 201,
          title: 'Senior Software Engineer',
          company: 'GlobalTech',
          location: 'San Francisco, CA',
          salary: '$140,000 - $160,000',
          postedDate: '1 day ago',
          url: '#'
        },
        {
          id: 202,
          title: 'Senior Full Stack Developer',
          company: 'InnovateSoft',
          location: 'Remote',
          salary: '$120,000 - $150,000',
          postedDate: '3 days ago',
          url: '#'
        },
        {
          id: 203,
          title: 'Lead Software Engineer',
          company: 'TechSolutions',
          location: 'Austin, TX',
          salary: '$130,000 - $155,000',
          postedDate: '1 week ago',
          url: '#'
        }
      ]
    }
    // Additional career paths would be defined here
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Simulate loading data from a service
    setTimeout(() => {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.careerPath = this.careerPaths.find(path => path.id === id) || null;
        this.loading = false;
        
        if (!this.careerPath) {
          this.router.navigate(['/career-paths']);
        }
      });
    }, 800); // Simulate network delay
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  getSkillLevelClass(level: number): string {
    switch(level) {
      case 5: return 'level-5';
      case 4: return 'level-4';
      case 3: return 'level-3';
      case 2: return 'level-2';
      default: return 'level-1';
    }
  }
  
  getImportanceClass(importance: string): string {
    switch(importance) {
      case 'Essential': return 'importance-essential';
      case 'Important': return 'importance-important';
      default: return 'importance-helpful';
    }
  }
  
  navigateToCareerPath(id: number): void {
    this.router.navigate(['/career-paths', id]);
  }
  
  goBack(): void {
    this.router.navigate(['/jobseeker/careerpath']);
  }

}
