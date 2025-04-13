
import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { AiAnalysisComponent } from './ai-analysis/ai-analysis.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PerformanceComponent } from './performance/performance.component';


export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'jobmanagement', component:JobManagementComponent },
  { path: 'ai-analysis', component: AiAnalysisComponent},
  { path: 'usermanagement', component: UserManagementComponent },
  { path: 'performance', component: PerformanceComponent },
];