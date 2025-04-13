
import { Routes } from '@angular/router';
import { EmployerDashboardComponent } from "./employer-dashboard/employer-dashboard.component";
import { JobsPostedComponent } from './jobs-posted/jobs-posted.component';
import { AiassistantComponent } from './aiassistant/aiassistant.component';
import { EmployerInterviewsComponent } from './employer-interviews/employer-interviews.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CandidatesComponent } from './candidates/candidates.component';


export const EMPLOYER_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: EmployerDashboardComponent },
  { path: 'jobsposted', component:JobsPostedComponent },
  { path: 'ai-assistant', component: AiassistantComponent},
  { path: 'applications', component: ApplicationsComponent},
  { path: 'interviews', component: EmployerInterviewsComponent },
  { path: 'candidates', component: CandidatesComponent },
  
];