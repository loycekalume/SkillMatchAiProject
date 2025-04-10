
import { Routes } from '@angular/router';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { JobManagementComponent } from './job-management/job-management.component';
// import { AiAnalysisComponent } from './ai-analysis/ai-analysis.component';
// import { UserManagementComponent } from './user-management/user-management.component';

import { EmployerDashboardComponent } from "./employer-dashboard/employer-dashboard.component";
import { JobsPostedComponent } from './jobs-posted/jobs-posted.component';
import { AiassistantComponent } from './aiassistant/aiassistant.component';
import { EmployerInterviewsComponent } from './employer-interviews/employer-interviews.component';
import { ApplicationsComponent } from './applications/applications.component';


export const EMPLOYER_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: EmployerDashboardComponent },
  { path: 'jobsposted', component:JobsPostedComponent },
  { path: 'ai-assistant', component: AiassistantComponent},
  { path: 'applications', component: ApplicationsComponent},
  { path: 'interviews', component: EmployerInterviewsComponent },
  
];