import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { COLOR, SIZE } from '../../models/enums';
import { RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DressService } from '../../services/dress.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  dressForm: FormGroup;
  colors = Object.values(COLOR);
  sizes = Object.values(SIZE);
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private dressService: DressService,
    private utilityService: UtilityService
  ) {
    this.dressForm = this.fb.group({
      name: ['', Validators.required],
      productCode: ['', Validators.required],
      color: ['', Validators.required],
      imageUrls: [[]],
      dressAvailability: this.fb.array([]),
    });
    this.addAvailability();
    console.log(this.dressForm);
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => this.selectedFiles.push(file));
      this.dressForm.patchValue({ imageUrls: this.selectedFiles });
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.dressForm.patchValue({ imageUrls: this.selectedFiles });
  }

  onSubmit(): void {
    if (this.dressForm.invalid) return;
    this.uploadImagesAndSaveDress();
  }

  getColorHex(arg0: COLOR): any {
    return this.utilityService.getColorHex(arg0);
  }

  private uploadImagesAndSaveDress(): void {
    this.dressService
      .uploadImages(this.selectedFiles)
      .pipe(switchMap((urls) => this.saveDressWithUrls(urls)))
      .subscribe({
        next: (response) => this.onSuccess(response),
        error: (error) => this.onError(error),
      });
  }

  private saveDressWithUrls(urls: string[]) {
    const updatedDress = {
      ...this.dressForm.value,
      imageUrls: urls,
    };
    return this.dressService.saveDress(updatedDress);
  }

  private onSuccess(response: any): void {
    console.log('Dress saved successfully:', response);
    this.dressForm.reset();
    this.selectedFiles = [];
  }

  private onError(error: any): void {
    console.error('Error saving dress:', error);
  }
}
