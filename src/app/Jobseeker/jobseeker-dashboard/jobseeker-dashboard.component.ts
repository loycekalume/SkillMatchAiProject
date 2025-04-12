import { Component } from '@angular/core';
import{SidebarComponent} from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterModule],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrl: './jobseeker-dashboard.component.css'
})
export class JobseekerDashboardComponent {

}
