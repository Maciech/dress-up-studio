import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Dress } from '../../models/dress.model';
import { CommonModule } from '@angular/common';
import { DressAvailability } from '../../models/availability.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  dress?: Dress;
  loading = true;
  productId = 0;
  selectedImageIndex = 0;
  selectedSize?: string;

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.apiService.getAllDresses().subscribe({
      next: (dresses: Dress[]) => {
        this.dress = dresses.find((dress) =>
          dress.dressAvailability.some(
            (availability) =>
              availability.dressAvailabilityId === this.productId
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

  getAvailableSizes(): string[] {
    if (!this.dress) return [];
    return [
      ...new Set(
        this.dress.dressAvailability
          .filter((a) => a.isAvailable)
          .map((a) => a.size)
      ),
    ];
  }

  getPriceForSize(size: string): number {
    if (!this.dress) return 0;
    const availability = this.dress.dressAvailability.find(
      (a) => a.size === size
    );
    return availability?.price ?? 0;
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToBasket(): void {
    if (!this.dress || !this.selectedSize) {
      alert('Please select a size first');
      return;
    }

    const price = this.getPriceForSize(this.selectedSize);
    this.basketService.addToBasket(this.dress, this.selectedSize, price);
  }

  prevImage(index: number): void {
    if (!this.dress) return;
    this.selectedImageIndex =
      index === 0 ? this.dress.imageUrls.length - 1 : index - 1;
  }

  nextImage(index: number): void {
    if (!this.dress) return;
    this.selectedImageIndex =
      index === this.dress.imageUrls.length - 1 ? 0 : index + 1;
  }
}
