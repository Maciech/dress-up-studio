import { Component, Input } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DressAvailability } from '../../models/availability.model';
import { COLOR } from '../../models/enums';

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

  constructor(private basketService: BasketService) {}

  addToBasket(item: Dress) {
    this.basketService.addItem(item);
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

  getColorHex(color: COLOR): string {
    console.log(color);
    const colorMap: { [key in COLOR]: string } = {
      [COLOR.RED]: 'red', // Bootstrap danger color
      [COLOR.BLUE]: 'blue', // Bootstrap primary color
      [COLOR.GREEN]: 'green', // Bootstrap success color
      [COLOR.BLACK]: 'black', // Bootstrap dark color
      [COLOR.WHITE]: 'white', // Bootstrap secondary (grayish for contrast)
      [COLOR.PINK]: 'pink',
    };
    console.log(colorMap[color]);
    return colorMap[color] || '#6c757d'; // Default gray if not found
  }

  getLowestPrice(dressAvailability: DressAvailability[]) {
    if (!dressAvailability || dressAvailability.length === 0) return 'N/A';
    const prices = dressAvailability.map((a) => a.price);
    const minPrice = Math.min(...prices);
    return minPrice;
  }
}
