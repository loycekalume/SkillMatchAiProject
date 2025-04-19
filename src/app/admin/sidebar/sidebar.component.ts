import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../admin-dashboard/admin-dashboard.component.css'],
})
export class SidebarComponent {
  constructor(

    private authService: AuthService // ✅ Inject AuthService
  ) {}

  menuItems = [
    { link: '/admin/dashboard', icon: 'fas fa-home', text: 'Dashboard', active: true },
    { link: '/admin/jobmanagement', icon: 'fas fa-briefcase', text: 'Job Management', active: false },
    { link: '/admin/ai-analysis', icon: 'fas fa-brain', text: 'AI Analysis', active: false },
    { link: '/admin/usermanagement', icon: 'fas fa-user', text: 'User Management', active: false },
    { link: '/admin/performance', icon: 'fas fa-user', text: 'System Performance', active: false },
    
    
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
