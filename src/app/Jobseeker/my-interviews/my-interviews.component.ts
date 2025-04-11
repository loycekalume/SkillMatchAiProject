import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-my-interviews',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './my-interviews.component.html',
  styleUrl: './my-interviews.component.css'
})
export class MyInterviewsComponent {

}
