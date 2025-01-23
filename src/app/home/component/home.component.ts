import { Component } from '@angular/core';
import { Dress } from '../model/dress.model';
import { DressService } from '../service/dress.service';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DressService]  
})
export class HomeComponent {
  dresses: Dress[] = [];

  constructor(private dressService: DressService) {}

  ngOnInit(): void {
    this.dressService.getAllDresses().subscribe((data: Dress[]) => {
      this.dresses = data;
    });
  }
}
