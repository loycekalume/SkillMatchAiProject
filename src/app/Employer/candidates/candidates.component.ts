import { Component } from '@angular/core';
import { EmployerDashboardComponent } from '../employer-dashboard/employer-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScheduleModalService } from '../../services/schedule-modal.service';


@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [SidebarComponent ],
  templateUrl: './candidates.component.html',
  styleUrls:['./candidates.component.css','../employer-dashboard/employer-dashboard.component.css'] 
})
export class CandidatesComponent {
  constructor(private modalService: ScheduleModalService) {}

  openModal() {
    this.modalService.show();
  }
}
