import { COLOR, SIZE } from "./enums";

export interface Dress {
  name: string;
  price: number;
  size: SIZE[]; // Array of SIZE enums
  color: COLOR[]; // Array of COLOR enums
  imageUrl: string;
}
