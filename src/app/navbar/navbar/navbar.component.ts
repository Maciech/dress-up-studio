import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: []
})
export class NavbarComponent { 
  scrolled = false;

  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }
}