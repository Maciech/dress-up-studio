import { Component, OnInit } from '@angular/core';
import { Dress } from '../../models/dress.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DressCardComponent } from "../dress-card/dress-card.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DressCardComponent],
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
}
