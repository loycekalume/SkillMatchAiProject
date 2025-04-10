import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-job-management',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './job-management.component.html',
  styleUrl: './job-management.component.css'
})
export class JobManagementComponent {

}
