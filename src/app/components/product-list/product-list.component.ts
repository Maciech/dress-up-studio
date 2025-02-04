import { Component, OnInit } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DressCardComponent } from '../dress-card/dress-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { SIZE } from '../../models/enums';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DressCardComponent,
    ProductFilterComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  dresses: Dress[] = []; // Holds all dresses from API
  filteredDresses: Dress[] = []; // Holds dresses after filter is applied
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllDresses().subscribe({
      next: (data) => {
        this.dresses = data;
        this.filteredDresses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dresses:', err);
        this.loading = false;
      },
    });
  }

  onFiltersChanged(filters: any) {
    this.filteredDresses = this.dresses.filter((dress) => {
      const matchesSearch =
        !filters.searchTerm ||
        dress.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesSize =
        filters.size.length === 0 ||
        filters.size.some((size: SIZE) => dress.dressAvailability.some((avail) => avail.size === size));

      const matchesColor =
        filters.color.length === 0 || filters.color.includes(dress.color);

      return matchesSearch && matchesSize && matchesColor;
    });
  }
}
