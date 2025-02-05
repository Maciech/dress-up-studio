import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from '../../components/add-product/add-product.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, AddProductComponent, HttpClientModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
