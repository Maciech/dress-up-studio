import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dress } from '../models/dress.model';

@Injectable({
  providedIn: 'root',
})
export class DressFilterService {
  private dresses: Dress[] = []; // All available dresses
  private filteredDressesSubject = new BehaviorSubject<Dress[]>([]); // Subject to emit filtered dresses
  filteredDresses$ = this.filteredDressesSubject.asObservable(); // Observable to subscribe to filtered dresses

  constructor() {}

  // Method to set the complete list of dresses
  updateFilteredDresses(dresses: Dress[]) {
    this.dresses = dresses;
    this.filteredDressesSubject.next(this.dresses); // Emit the full list initially
  }

  // Method to apply filters based on search term, size, and color
  applyFilters(filters: { searchTerm: string; size: string; color: string }) {
    let filtered = this.dresses;

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter((dress) =>
        dress.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply size filter
    if (filters.size) {
      filtered = filtered.filter((dress) =>
        dress.dressAvailability.some((avail) => avail.size === filters.size)
      );
    }

    // Apply color filter
    if (filters.color) {
      filtered = filtered.filter((dress) => dress.color === filters.color);
    }

    // Emit the filtered list
    this.filteredDressesSubject.next(filtered);
  }
}
