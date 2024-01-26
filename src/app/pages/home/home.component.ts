import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { FormsModule, NgModel } from '@angular/forms';

import { Country } from '../../types/api';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ThemeService } from '../../services/theme.service';

const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    CountryCardComponent,
    FormsModule,
    DropdownComponent,
  ],
  providers: [ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private source: Country[];
  searchFilter?: string;
  regionFilter: string;
  regionOptions = REGION_OPTIONS;

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.apiService.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
  }

  get countries() {
    return this.source
      ? this.source
          .filter((country) =>
            this.searchFilter
              ? country.name.common
                  .toLowerCase()
                  .includes(this.searchFilter.toLowerCase())
              : true
          )
          .filter((country) =>
            this.regionFilter
              ? country.region.includes(this.regionFilter)
              : true
          )
      : this.source;
  }
  toggleTheme() {
    this.themeService.toggleMode();
  }
}
