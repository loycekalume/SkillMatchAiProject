import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-jobs-posted',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './jobs-posted.component.html',
  styleUrl: './jobs-posted.component.css'
})
export class JobsPostedComponent {

}
