import { Component } from '@angular/core';
import{SidebarComponent} from '../sidebar/sidebar.component';
@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrl: './jobseeker-dashboard.component.css'
})
export class JobseekerDashboardComponent {

}
