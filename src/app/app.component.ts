import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme, ThemeService } from './services/theme.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
//import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    AsyncPipe,
    HttpClientModule,
    DropdownComponent,
  ],
  providers: [ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  theme: Observable<Theme>;
  constructor(
    private themeService: ThemeService,
    private apiService: ApiService
  ) {
    this.theme = this.themeService.mode$;
  }
  ngOnInit() {
    this.theme = this.themeService.mode$;
    this.apiService.getAllCountries().subscribe((res) => console.log(res));
  }
}
