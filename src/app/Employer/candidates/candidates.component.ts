import { Component } from '@angular/core';
import { EmployerDashboardComponent } from '../employer-dashboard/employer-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './candidates.component.html',
  styleUrls:['./candidates.component.css','../employer-dashboard/employer-dashboard.component.css'] 
})
export class CandidatesComponent {

}
