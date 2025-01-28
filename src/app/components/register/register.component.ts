import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmailCheckService } from '../../services/email.check.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private emailCheckService: EmailCheckService, // Inject the email check service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(StrongPasswordRegx)],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      city: [''],
      streetAndNumber: [''],
      cityCode: [''],
    });

    // Subscribe to the email control value changes
    this.email?.valueChanges.subscribe((email) => {
      if (this.email?.valid) {
        this.onEmailTouchedAndValid(email); // Check if the email is valid
      }
    });
  }

  // Getters for form controls
  get email(): FormControl {
    return this.registerForm.get('emailAddress') as FormControl;
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  // Register function
  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during registration:', error);
      },
    });
  }

  // Method triggered when the email is valid and touched
  onEmailTouchedAndValid(email: string): void {
    this.checkIfUserExists(email); // Check if the email exists in the system
  }

  // Method to check if the email exists using the service
  checkIfUserExists(email: string): void {
    this.emailCheckService.triggerCheck(email); // Trigger the debounced check
  }
}

// Strong password regex for validation
const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
