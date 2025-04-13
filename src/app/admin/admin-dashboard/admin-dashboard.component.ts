import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule,SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  public hiringChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Hires', data: [5, 8, 6, 9, 4], backgroundColor: '#6a5acd' }
    ]
  };

  public registrationChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'User Registrations',
        data: [20, 35, 50, 40],
        borderColor: '#32cd32',
        fill: true,
        backgroundColor: 'rgba(50, 205, 50, 0.2)'
      }
    ]
  };
}
