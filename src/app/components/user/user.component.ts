import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userData: any;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  public fetchUserData(): void {
    this.authService.getUserData().subscribe({
      next: (response) => {
        console.log('!!response', response);
        this.userData = response;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.userData = { error: 'Unable to fetch user data' };
      },
    });
  }
}
