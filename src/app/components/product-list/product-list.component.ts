import { Component, OnInit } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { DressService } from '../../services/dress.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { COLOR } from '../../models/enums';
import { DressAvailability } from '../../models/availability.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  dresses: Dress[] = [];
  currentImageIndex: number[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllDresses().subscribe({
      next: (data) => {
        this.dresses = data;
        this.loading = false;
        this.currentImageIndex = new Array(this.dresses.length).fill(0);
      },
      error: (err) => {
        console.error('Error fetching dresses:', err);
        this.loading = false;
      },
    });
  }

  // Navigate to the previous image
  prevImage(dressIndex: number) {
    if (this.dresses[dressIndex].imageUrls.length > 0) {
      this.currentImageIndex[dressIndex] =
        (this.currentImageIndex[dressIndex] -
          1 +
          this.dresses[dressIndex].imageUrls.length) %
        this.dresses[dressIndex].imageUrls.length;
    }
  }

  // Navigate to the next image
  nextImage(dressIndex: number) {
    if (this.dresses[dressIndex].imageUrls.length > 0) {
      this.currentImageIndex[dressIndex] =
        (this.currentImageIndex[dressIndex] + 1) %
        this.dresses[dressIndex].imageUrls.length;
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
