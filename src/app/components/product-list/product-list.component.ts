import { Component, OnInit } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { DressService } from '../../services/dress.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { COLOR } from '../../models/enums';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  dresses: Dress[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllDresses().subscribe({
      next: (data) => {
        this.dresses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dresses:', err);
        this.loading = false;
      },
    });
  }

  getColorHex(color: COLOR): string {
    const colorMap: { [key in COLOR]: string } = {
      [COLOR.RED]: '.bg-warning',  // Bootstrap danger color
      [COLOR.BLUE]: '#0d6efd', // Bootstrap primary color
      [COLOR.GREEN]: '#198754', // Bootstrap success color
      [COLOR.BLACK]: '#343a40', // Bootstrap dark color
      [COLOR.WHITE]: '#6c757d' // Bootstrap secondary (grayish for contrast)
    };
    return colorMap[color] || '#6c757d'; // Default gray if not found
  }
}
