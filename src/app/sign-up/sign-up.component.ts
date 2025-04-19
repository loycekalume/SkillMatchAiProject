import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../home/home.component.css', '../login/login.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  passwordStrength = '';
  passwordStrengthClass = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      role: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      const length = value?.length || 0;
      if (length < 6) {
        this.passwordStrength = 'Weak';
        this.passwordStrengthClass = 'weak';
      } else if (length < 10) {
        this.passwordStrength = 'Medium';
        this.passwordStrengthClass = 'medium';
      } else {
        this.passwordStrength = 'Strong';
        this.passwordStrengthClass = 'strong';
      }
    });
  }

  selectRole(role: string): void {
    this.signupForm.patchValue({ role });
    this.signupForm.get('role')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formValue = this.signupForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      role: formValue.role!,
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      email: formValue.email!,
      password: formValue.password!
    };

    this.authService.register(userData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.message || 'Registration failed.');
      }
    });
  }
}
