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
    {
        path: 'jobmatches',
        loadComponent() {
            return import('./Jobseeker/jobmatches/jobmatches.component').then(({ JobmatchesComponent }) => JobmatchesComponent);
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
