import { DressAvailability } from './availability.model';
import { COLOR } from './enums';

export interface Dress {
  name: string;
  productCode: string;
  color: COLOR;
  dressAvailability: DressAvailability[];
  imageUrls: string[];
}
