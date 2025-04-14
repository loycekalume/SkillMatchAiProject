import { Routes } from '@angular/router';
import { CareerDetailsComponent } from './Jobseeker/career-details/career-details.component';

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
        path: 'features',
        loadComponent() {
            return import('./features/features.component').then(({ FeaturesComponent }) => FeaturesComponent);
        },
    },
    {
        path: 'howitworks',
        loadComponent() {
            return import('./howitworks/howitworks.component').then(({ HowitworksComponent  }) =>HowitworksComponent );
        },
    },
    
    {
        path: 'employer',
        loadChildren: () => import('./Employer/employer.routes').then(m => m.EMPLOYER_ROUTES),
      
    },
    {
        path: 'jobseeker',
        loadChildren: () => import('./Jobseeker/jobseeker.routes').then(m => m.JOBSEEKER_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'career-paths/:id',
        component: CareerDetailsComponent
      }
      
];
