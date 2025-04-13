import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../admin-dashboard/admin-dashboard.component.css'],
})
export class SidebarComponent {
  menuItems = [
    { link: '/admin/dashboard', icon: 'fas fa-home', text: 'Dashboard', active: true },
    { link: '/admin/jobmanagement', icon: 'fas fa-briefcase', text: 'Job Management', active: false },
    { link: '/admin/ai-analysis', icon: 'fas fa-brain', text: 'AI Analysis', active: false },
    { link: '/admin/usermanagement', icon: 'fas fa-user', text: 'User Management', active: false },
    { link: '/admin/performance', icon: 'fas fa-user', text: 'System Performance', active: false },
    
    
  ];
  
  closeSidebar(): void {
    document.querySelector('.sidebar')?.classList.remove('active');
  }

}
