import { Component } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Dress } from '../../models/dress.model';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent {
  basketItems: Dress[] = [];
  constructor(private basketService: BasketService) {
    this.basketService.items$.subscribe((items: Dress[]) => {
      this.basketItems = items;
    });
  }

  getTotal(): any {
    console.log('');
  }

  removeItem(item: Dress) {
    this.basketService.removeItem(item);
  }
}
