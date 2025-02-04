import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dress } from '../models/dress.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private items = new BehaviorSubject<Dress[]>([]);
  items$ = this.items.asObservable();

  addItem(product: Dress) {
    const currentItems = this.items.value;
    this.items.next([...currentItems, product]);
  }

  removeItem(product: Dress) {
    const updatedItems = this.items.value.filter((item) => item !== product);
    this.items.next(updatedItems);
  }

  clearBasket() {
    this.items.next([]);
  }

  getItems() {
    return this.items.value;
  }
}
