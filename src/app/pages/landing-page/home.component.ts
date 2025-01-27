import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DressListComponent } from '../main-page/dress-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Dress } from '../../models/dress.model';
import { ApiService } from '../../services/api.service';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DressListComponent, UserComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent {
  dresses: Dress[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllDresses().subscribe((data: Dress[]) => {
      this.dresses = data;
    });
  }
}
