import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  menuItems = [
    { link: '/jobseeker/dashboard', icon: 'fas fa-home', text: 'Dashboard', active: true },
    { link: '/jobseeker/profile', icon: 'fas fa-user', text: 'My Profile', active: false },
    { link: '/jobseeker/ai-assistant', icon: 'fas fa-brain', text: 'AI Assistant', active: false },
    { link: '/jobseeker/interviews', icon: 'fas fa-calendar', text: 'Interviews', active: false },
    { link: '/jobseeker/jobmatches', icon: 'fas fa-briefcase', text: 'Job Matches', active: false },
    { link: '/jobseeker/careerpath', icon: 'fas fa-chart-line', text: 'Career Path', active: false },
  ];

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  closeSidebar(): void {
    document.querySelector('.sidebar')?.classList.remove('active');
  }
}
