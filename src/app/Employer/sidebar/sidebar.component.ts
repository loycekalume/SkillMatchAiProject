import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menuItems = [
    { link: '/employer/dashboard', icon: 'fas fa-home', text: 'Dashboard', active: true },
    { link: '/employer/profile', icon:'fas fa-user', text: 'Profile', active: false },
    { link: '/employer/jobsposted', icon: 'fas fa-briefcase', text: 'Jobs Posted', active: false },
    { link: '/employer/ai-assistant', icon: 'fas fa-brain', text: 'AI Assistant', active: false },
    { link: '/employer/interviews', icon: 'fas fa-user', text: 'Interviews', active: false },
    { link: '/employer/candidates', icon: 'fas fa-users', text: 'Candindates', active: false },
    { link: '/employer/applications', icon: 'fas fa-user', text: 'Applications', active: false },
    
  ];
  
  closeSidebar(): void {
    document.querySelector('.sidebar')?.classList.remove('active');
  }

}
