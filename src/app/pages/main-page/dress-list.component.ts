import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DressCardComponent } from '../../components/dress-card/dress-card.component';
import { ApiService } from '../../services/api.service';
import { Dress } from '../../models/dress.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dress-list',
  standalone: true,
  imports: [CommonModule, DressCardComponent, HttpClientModule],
  templateUrl: './dress-list.component.html',
  styleUrls: ['./dress-list.component.css']
})
export class DressListComponent {
@Input() dresses!: Dress[];
  
}
