import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavBarComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleMode();
  }
}
