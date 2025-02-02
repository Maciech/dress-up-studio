import { SIZE } from "./enums";

export interface DressAvailability {

    dressAvailabilityId: number;
    size: SIZE;
    isAvailable: boolean;
    price: number;
}