import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./home/home.component').then(({ HomeComponent }) => HomeComponent);
        },
    },
    // {
    //     path: 'jobmatches',
    //     loadComponent() {
    //         return import('./Jobseeker/jobmatches/jobmatches.component').then(({ JobmatchesComponent }) => JobmatchesComponent);
    //     },
    // },
    // {
    //     path: 'profile',
    //     loadComponent() {
    //         return import('./Jobseeker/jobseeker-profile/jobseeker-profile.component').then(({ JobseekerProfileComponent }) => JobseekerProfileComponent);
    //     },
    // },
    // {
    //     path: 'interviews',
    //     loadComponent() {
    //         return import('./Jobseeker/my-interviews/my-interviews.component').then(({ MyInterviewsComponent }) => MyInterviewsComponent);
    //     },
    // },
    // {
    //     path: 'careerpath',
    //     loadComponent() {
    //         return import('./Jobseeker/careerpath/careerpath.component').then(({ CareerpathComponent }) => CareerpathComponent);
    //     },
    // },
    // {
    //     path: 'ai-assistant',
    //     loadComponent() {
    //         return import('./Jobseeker/aiassistant/aiassistant.component').then(({ AiassistantComponent }) => AiassistantComponent);
    //     }
    // },
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

    
    {
        path: 'employer',
        loadChildren: () => import('./Employer/employer.routes').then(m => m.EMPLOYER_ROUTES)
    },
    {
        path: 'jobseeker',
        loadChildren: () => import('./Jobseeker/jobseeker.routes').then(m => m.JOBSEEKER_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
];
