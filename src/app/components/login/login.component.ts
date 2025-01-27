import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  token = '';
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: { token: string }) => {
        this.token = response.token;
        this.authService.setToken(response.token); // Save the token to storage
        this.router.navigate(['/user']); // Navigate to the user page
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
  ngOnDestroy(): void {
    console.log('kutas registration', this.token);
  }
}
