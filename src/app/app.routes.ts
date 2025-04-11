import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./home/home.component').then(({ HomeComponent }) => HomeComponent);
        },
    },
   
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
    // { path: 'ai', component: AiAnalysisComponent },
    // { path: 'applications', component: ApplicationsComponent },
    // { path: 'jobsposted', component:JobsPostedComponent },
    // { path: 'adminjobs', component: JobManagementComponent},
    // { path: 'usermanagement', component: UserManagementComponent},
    // { path: 'admin', component: AdminDashboardComponent},
    // { path: 'jobseeker', component: JobseekerComponent},
    // { path: 'careerpath', component: CareerpathComponent},
    // { path: 'myinterviews', component: MyInterviewsComponent},
    // { path: 'employerinterviews', component: EmployerInterviewsComponent},
    // { path: 'chat', component: AiassistantComponent},
    // { path: 'employer', component: EmployerComponent},
    // { path: 'jobseekerProfile', component: JobseekerProfileComponent},
    {
        path: 'admin',
        loadChildren: () => import('./Admin/admin.routes').then(m => m.ADMIN_ROUTES)
        }, 
        {
            path: 'employer',
            loadChildren: () => import('./Employer/employer.routes').then(m => m.EMPLOYER_ROUTES)
            } ,
            {
                path: 'jobseeker',
                loadChildren: () => import('./Jobseeker/jobseeker.routes').then(m => m.JOBSEEKER_ROUTES)
                } 
];
