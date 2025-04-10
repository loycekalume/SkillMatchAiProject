import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../home/home.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      console.log('Login attempt:', email);
      
      // In a real application, you would authenticate against your backend
      // For now, we'll simulate authentication and role determination
      this.authenticateUser(email, password);
    } else {
      // Mark form controls as touched to display validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
  
  private authenticateUser(email: string, password: string): void {
    // Simulate API call with a small delay
    console.log('Authenticating user...');
    
    setTimeout(() => {
      // For demonstration purposes, determine user role based on email
      // In a real app, this would come from your authentication service/API
      let userRole = this.determineUserRole(email);
      
      // Store user info in localStorage (or use a proper auth service)
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isLoggedIn', 'true');
      
      console.log(`User authenticated as: ${userRole}`);
      
      // Redirect based on user role
      this.redirectBasedOnRole(userRole);
    }, 1000);
  }
  
  private determineUserRole(email: string): string {
    // This is a simplified example - in a real application, 
    // the role would come from your authentication service or JWT token
    if (email.includes('admin')) {
      return 'admin';
    } else if (email.includes('employer')) {
      return 'employer';
    } else {
      return 'jobseeker';
    }
  }
  
  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'employer':
        this.router.navigate(['/employer']);
        break;
      case 'jobseeker':
        this.router.navigate(['/jobseeker']);
        break;
      default:
        // Fallback to home page if role is unknown
        this.router.navigate(['']);
        break;
    }
  }
}