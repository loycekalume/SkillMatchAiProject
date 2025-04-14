
import { Routes } from '@angular/router';
import { JobseekerDashboardComponent } from './jobseeker-dashboard/jobseeker-dashboard.component';
import { MyInterviewsComponent } from './my-interviews/my-interviews.component';
import { JobseekerProfileComponent } from './jobseeker-profile/jobseeker-profile.component';
import { CareerpathComponent } from './careerpath/careerpath.component';
import { AiassistantComponent } from './aiassistant/aiassistant.component';
import { JobmatchesComponent } from './jobmatches/jobmatches.component';



export const JOBSEEKER_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: JobseekerDashboardComponent },
  { path: 'profile', component:JobseekerProfileComponent },
  { path: 'ai-assistant', component: AiassistantComponent},
  { path: 'careerpath', component: CareerpathComponent},
  { path: 'interviews', component:MyInterviewsComponent },
  { path: 'jobmatches', component:JobmatchesComponent },
  
];