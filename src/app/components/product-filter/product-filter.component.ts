import { Component, EventEmitter, Output } from '@angular/core';
import { COLOR, SIZE } from '../../models/enums';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DressCardComponent } from '../dress-card/dress-card.component';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {

  filters = {
    searchTerm: '',
    size: [] as SIZE[], // Multi-select sizes
    color: [] as COLOR[], // Multi-select colors
  };

  availableSizes: SIZE[] = [SIZE.XS, SIZE.S, SIZE.M, SIZE.L, SIZE.XL];
  availableColors: COLOR[] = [
    COLOR.RED,
    COLOR.BLUE,
    COLOR.GREEN,
    COLOR.BLACK,
    COLOR.WHITE,
    COLOR.PINK,
  ];

  @Output() filtersChanged = new EventEmitter<any>();

  getColorHex(color: COLOR): string {
    console.log(color);
    const colorMap: { [key in COLOR]: string } = {
      [COLOR.RED]: 'red', // Bootstrap danger color
      [COLOR.BLUE]: 'blue', // Bootstrap primary color
      [COLOR.GREEN]: 'green', // Bootstrap success color
      [COLOR.BLACK]: 'black', // Bootstrap dark color
      [COLOR.WHITE]: 'white', // Bootstrap secondary (grayish for contrast)
      [COLOR.PINK]: 'pink',
    };
    console.log(colorMap[color]);
    return colorMap[color] || '#6c757d'; // Default gray if not found
  }

  onSearchChange(searchTerm: string) {
    this.filters.searchTerm = searchTerm; // Update the search term explicitly
    this.emitFilters();
  }

  onSizeCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value as SIZE;

    if (checkbox.checked) {
      this.filters.size.push(value);
    } else {
      this.filters.size = this.filters.size.filter((size) => size !== value);
    }

    this.emitFilters();
  }

  onColorCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value as COLOR;

    if (checkbox.checked) {
      this.filters.color.push(value);
    } else {
      this.filters.color = this.filters.color.filter(
        (color) => color !== value
      );
    }

    this.emitFilters();
  }

  emitFilters() {
    this.filtersChanged.emit(this.filters);
  }
}
