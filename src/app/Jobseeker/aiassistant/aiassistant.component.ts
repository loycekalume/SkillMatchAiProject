import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aiassistant',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './aiassistant.component.html',
  styleUrl: './aiassistant.component.css'
})
export class AiassistantComponent {

}
