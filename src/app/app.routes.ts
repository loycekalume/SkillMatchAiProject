import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AiAnalysisComponent } from './ai-analysis/ai-analysis.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobseekerProfileComponent } from './jobseeker-profile/jobseeker-profile.component';
import { MyInterviewsComponent } from './my-interviews/my-interviews.component';
import { CareerpathComponent } from './careerpath/careerpath.component';
import { AiassistantComponent } from './aiassistant/aiassistant.component';
import { EmployerComponent } from './employer/employer.component';
import { JobsPostedComponent } from './jobs-posted/jobs-posted.component';
import { EmployerInterviewsComponent } from './employer-interviews/employer-interviews.component';
import { ApplicationsComponent } from './applications/applications.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./home/home.component').then(({ HomeComponent }) => HomeComponent);
        },
    },
    { path: 'admin', component: AdminComponent },
    {
        path: 'login',
        loadComponent() {
            return import('./login/login.component').then(({ LoginComponent }) => LoginComponent);
        },
    },
    {
        path: 'signUp',
        loadComponent() {
            return import('./sign-up/sign-up.component').then(({ SignUpComponent }) => SignUpComponent);
        },
    },
    { path: 'ai', component: AiAnalysisComponent },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'jobsposted', component:JobsPostedComponent },
    { path: 'adminjobs', component: JobManagementComponent},
    { path: 'usermanagement', component: UserManagementComponent},
    { path: 'admindash', component: AdminDashboardComponent},
    { path: 'jobseeker', component: JobseekerComponent},
    { path: 'careerpath', component: CareerpathComponent},
    { path: 'myinterviews', component: MyInterviewsComponent},
    { path: 'employerinterviews', component: EmployerInterviewsComponent},
    { path: 'chat', component: AiassistantComponent},
    { path: 'employer', component: EmployerComponent},
    { path: 'jobseekerProfile', component: JobseekerProfileComponent},
];
