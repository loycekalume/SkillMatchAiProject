import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../search/search.component';
import { FormsModule } from '@angular/forms';


interface Interview {
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  status: 'active' | 'pending';
  type: string;
}
@Component({
  selector: 'app-my-interviews',
  standalone: true,
  imports: [SidebarComponent,CommonModule,SearchComponent,FormsModule],
  templateUrl: './my-interviews.component.html',
  styleUrl: './my-interviews.component.css'
})
export class MyInterviewsComponent {
  searchQuery: string = '';
  
  overviewCards = [
    { title: 'Upcoming Interviews', value: '1', subtitle: 'Tomorrow' },
    { title: 'Applied Jobs', value: '1', subtitle: 'This week' },
    { title: 'Profile strength', value: '85%', subtitle: 'Enhance your profile to get noticed' },
    { title: 'Messages', value: '3', subtitle: 'Unread messages from recruiters' }
  ];

  interviews: Interview[] = [
    {
      jobTitle: 'Senior Frontend Engineer',
      company: 'TechCorp',
      date: 'March 15',
      time: '10:00 AM - 11:00 AM',
      status: 'active',
      type: 'Video'
    },
    {
      jobTitle: 'Frontend Developer',
      company: 'The Jitu',
      date: 'April 10',
      time: '10:00 AM - 11:00 AM',
      status: 'pending',
      type: 'Video'
    }
  ];

  get filteredInterviews(): Interview[] {
    if (!this.searchQuery) {
      return this.interviews;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.interviews.filter(interview => 
      interview.jobTitle.toLowerCase().includes(query) ||
      interview.company.toLowerCase().includes(query) ||
      interview.date.toLowerCase().includes(query) ||
      interview.type.toLowerCase().includes(query)
    );
  }

  constructor(private searchService: SearchService) {
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  onSearch(query: string) {
    this.searchService.updateSearchQuery(query);
  }

}
