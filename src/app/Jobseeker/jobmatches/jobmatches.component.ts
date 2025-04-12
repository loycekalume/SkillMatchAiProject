import { Component } from '@angular/core';
import { SidebarComponent } from '../../Admin/sidebar/sidebar.component';
import { RouterModule ,Router} from '@angular/router';

@Component({
  selector: 'app-jobmatches',
  standalone: true,
  imports: [RouterModule,SidebarComponent],
  templateUrl: './jobmatches.component.html',
  styleUrl: './jobmatches.component.css'
})
export class JobmatchesComponent {

}
