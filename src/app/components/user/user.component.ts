import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userData: any;

  constructor(private authService: AuthService,
    private apiService: ApiService, // Assuming ApiService is a service that fetches dresses from the server.
  ) {}

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

  // public saveDress(): void {
  //   this.apiService.saveImage().pipe(
  //     switchMap((data) => this.apiService.createDress(data))
  //   ).subscribe();
    
  // }
}
