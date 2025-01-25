import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
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
    cityCode: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during registration:', error);
      }
    });
  }
}