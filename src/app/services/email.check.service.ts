import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailCheckService {
  private cache = new Map<string, boolean>();
  private emailSubject = new BehaviorSubject<string>(''); // Subject to hold email value
  private emailCheckSubscription: any;

  constructor(private http: HttpClient) {}

  // Observable for email check
  checkEmail(email: string): Observable<{ available: boolean }> {
    if (this.cache.has(email)) {
      // If cached, return cached result
      return of({ available: this.cache.get(email)! });
    }

    // Otherwise, make the API call to check the email
    return this.http
      .post<{ available: boolean }>('/api/check-email', { email })
      .pipe(
        tap((response) => {
          // Cache the result
          this.cache.set(email, response.available);
        })
      );
  }

  // Trigger the email check and start the debounced check
  triggerCheck(email: string): void {
    this.emailSubject.next(email); // Emit the email to trigger the debounced check

    // Ensure the subscription is active and listening
    if (!this.emailCheckSubscription) {
      this.emailCheckSubscription = this.emailSubject
        .pipe(
          debounceTime(500), // Wait for 500ms after the last keystroke
          distinctUntilChanged(), // Only fire when the email changes
          switchMap((email) => this.checkEmail(email)) // Call the API with the debounced email
        )
        .subscribe();
    }
  }
}
