import { Component, Input } from '@angular/core';
import { Dress } from '../../models/dress.model';

@Component({
  selector: 'app-dress-card',
  standalone: true,
  imports: [],
  templateUrl: './dress-card.component.html',
  styleUrl: './dress-card.component.css'
})
export class DressCardComponent {
  @Input() dress!: Dress;
}
