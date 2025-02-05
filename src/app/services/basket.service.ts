import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketItem } from '../models/basket-item.model';
import { Dress } from '../models/dress.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketKey = 'shopping_basket';
  private basketItems = new BehaviorSubject<BasketItem[]>([]);

  constructor() {
    this.loadBasket();
  }

  private loadBasket(): void {
    const savedBasket = localStorage.getItem(this.basketKey);
    if (savedBasket) {
      this.basketItems.next(JSON.parse(savedBasket));
    }
  }

  private saveBasket(items: BasketItem[]): void {
    localStorage.setItem(this.basketKey, JSON.stringify(items));
    this.basketItems.next(items);
  }

  getBasketItems(): Observable<BasketItem[]> {
    return this.basketItems.asObservable();
  }

  addToBasket(dress: Dress, size: string, price: number): void {
    const currentItems = this.basketItems.value;
    const existingItem = currentItems.find(
      (item) =>
        item.dress.name === dress.name &&
        item.dress.color === dress.color &&
        item.dress.productCode === dress.productCode &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
      this.saveBasket([...currentItems]);
    } else {
      const newItem: BasketItem = {
        id: Date.now(),
        dress,
        size,
        quantity: 1,
        price,
      };
      this.saveBasket([...currentItems, newItem]);
    }
  }

  removeFromBasket(itemId: number): void {
    const currentItems = this.basketItems.value;
    this.saveBasket(currentItems.filter((item) => item.id !== itemId));
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentItems = this.basketItems.value;
    const item = currentItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveBasket([...currentItems]);
    }
  }

  clearBasket(): void {
    this.saveBasket([]);
  }

  getTotalItems(): Observable<number> {
    return new Observable<number>((observer) => {
      this.basketItems.subscribe((items) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(total);
      });
    });
  }

  getTotalPrice(): Observable<number> {
    return new Observable<number>((observer) => {
      this.basketItems.subscribe((items) => {
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        observer.next(total);
      });
    });
  }
}
