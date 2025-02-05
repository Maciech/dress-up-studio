import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { BasketItem } from '../../models/basket-item.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  basketItems: BasketItem[] = [];
  totalPrice = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.getBasketItems().subscribe((items) => {
      this.basketItems = items;
    });

    this.basketService.getTotalPrice().subscribe((total) => {
      this.totalPrice = total;
    });
  }

  removeItem(itemId: number): void {
    this.basketService.removeFromBasket(itemId);
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.basketService.updateQuantity(itemId, quantity);
  }
}
