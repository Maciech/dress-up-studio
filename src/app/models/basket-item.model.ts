import { Dress } from './dress.model';

export interface BasketItem {
  id: number;
  dress: Dress;
  size: string;
  quantity: number;
  price: number;
}
