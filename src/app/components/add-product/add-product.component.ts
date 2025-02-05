import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { COLOR, SIZE } from '../../models/enums';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  dressForm: FormGroup;
  colors = Object.values(COLOR); // Enum values for color dropdown
  sizes = Object.values(SIZE); // Enum values for size dropdown

  constructor(private fb: FormBuilder) {
    this.dressForm = this.fb.group({
      name: ['', Validators.required],
      productCode: ['', Validators.required],
      color: ['', Validators.required],
      imageUrls: [''],
      dressAvailability: this.fb.array([]),
    });
  }

  get dressAvailability(): FormArray {
    return this.dressForm.get('dressAvailability') as FormArray;
  }

  addAvailability(): void {
    const availabilityGroup = this.fb.group({
      size: ['', Validators.required],
      isAvailable: [true, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
    this.dressAvailability.push(availabilityGroup);
  }

  removeAvailability(index: number): void {
    this.dressAvailability.removeAt(index);
  }

  onSubmit(): void {
    if (this.dressForm.valid) {
      console.log('Dress Data:', this.dressForm.value);
      // Process the form data (e.g., send it to a backend service)
    }
  }
}
