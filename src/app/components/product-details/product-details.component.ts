import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Dress } from '../../models/dress.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  dress?: Dress;
  loading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const dressId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.apiService.getAllDresses().subscribe({
      next: (dresses: Dress[]) => {
        this.dress = dresses.find((dress) =>
          dress.dressAvailability.some(
            (availability) => availability.dressAvailabilityId === dressId
          )
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dresses:', err);
        this.loading = false;
      },
    });
  }
  addToBasket(arg0: Dress | undefined) {
    throw new Error('Method not implemented.');
  }
}
