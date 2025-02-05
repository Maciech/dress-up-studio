import { Component, Input } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DressAvailability } from '../../models/availability.model';
import { COLOR } from '../../models/enums';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-dress-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dress-card.component.html',
  styleUrl: './dress-card.component.css',
})
export class DressCardComponent {
  @Input() dress!: Dress;
  currentImageIndex: number = 0;

  constructor(
    private router: Router,
    private basketService: BasketService,
    private utilityService: UtilityService
  ) {}

  addToBasket(item: Dress) {
    this.basketService.addItem(item);
  }

  getColorHex(arg0: COLOR): any {
    return this.utilityService.getColorHex(arg0);
  }

  prevImage(dressIndex: number) {
    if (this.dress.imageUrls.length > 0) {
      if (dressIndex - 1 >= 0) {
        this.currentImageIndex = dressIndex - 1;
      } else {
        this.currentImageIndex = this.dress.imageUrls.length - 1;
      }
    }
  }

  nextImage(dressIndex: number) {
    if (this.dress.imageUrls.length > 0) {
      if (dressIndex + 1 < this.dress.imageUrls.length) {
        this.currentImageIndex = dressIndex + 1;
      } else {
        this.currentImageIndex = 0;
      }
    }
  }

  // Extract unique sizes from dress availability
  getUniqueSizes(availability: DressAvailability[]): string[] {
    return [...new Set(availability.map((a) => a.size))];
  }

  getLowestPrice(dressAvailability: DressAvailability[]) {
    if (!dressAvailability || dressAvailability.length === 0) return 'N/A';
    const prices = dressAvailability.map((a) => a.price);
    const minPrice = Math.min(...prices);
    return minPrice;
  }
  navigateToProductDetails(dress: Dress) {
    this.router.navigate([
      '/dress',
      dress.dressAvailability[0].dressAvailabilityId,
    ]); // by default navigate to the first dress
  }
}
