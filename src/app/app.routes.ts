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
    // {
    //     path: 'performance',
    //     loadComponent() {
    //         return import('./admin/performance/performance.component').then(({ PerformanceComponent }) => PerformanceComponent);
    //     },
    // },
    // {
    //     path: 'ai-analysis',
    //     loadComponent() {
    //         return import('./admin/ai-analysis/ai-analysis.component').then(({ AiAnalysisComponent }) => AiAnalysisComponent);
    //     },
    // },
    // {
    //     path: 'usermanagement',
    //     loadComponent() {
    //         return import('./admin/user-management/user-management.component').then(({  UserManagementComponent }) =>   UserManagementComponent );
    //     },
    // },
    // {
    //     path: 'jobmanagement',
    //     loadComponent() {
    //         return import('./admin/job-management/job-management.component').then(({  JobManagementComponent }) =>   JobManagementComponent );
    //     },
    // },
    // {
    //     path: 'admin',
    //     loadComponent() {
    //         return import('./admin/admin-dashboard/admin-dashboard.component').then(({  AdminDashboardComponent  }) =>  AdminDashboardComponent );
    //     },
    // },
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
