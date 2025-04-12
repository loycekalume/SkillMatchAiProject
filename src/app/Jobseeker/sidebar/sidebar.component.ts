import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../jobseeker-dashboard/jobseeker-dashboard.component.css'],
})
export class SidebarComponent {
  menuItems = [
    { link: '/jobseeker/dashboard', icon: 'fas fa-home', text: 'Dashboard', active: true },
    { link: '/jobseeker/profile', icon: 'fas fa-briefcase', text: 'My Profile', active: false },
    { link: '/jobseeker/ai-assistant', icon: 'fas fa-file-alt', text: 'AI Assistant', active: false },
    { link: '/jobseeker/interviews', icon: 'fas fa-user', text: 'Interviews', active: false },
    { link: '/jobseeker/jobmatches', icon: 'fas fa-user', text: 'Job Matches', active: false },
    { link: '/jobseeker/careerpath', icon: 'fas fa-user', text: 'Career Path', active: false },
    
  ];
  
  closeSidebar(): void {
    document.querySelector('.sidebar')?.classList.remove('active');
  }

}
