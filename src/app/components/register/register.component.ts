import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: null,
    emailAddress: '',
    city: '',
    streetAndNumber: '',
    cityCode: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  successMessage: string | null = null;
  errorMessage: string | null = null;

  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.successMessage =
          'Registration successful! Redirecting to login...';
        this.errorMessage = null;

        // Redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = null;
        console.error('Error during registration:', error);
      },
    });
  }

}
