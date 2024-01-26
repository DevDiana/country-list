import { Component, OnInit, numberAttribute } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, forkJoin, of, pipe } from 'rxjs';
import { Country, Currency, Language } from '../../types/api';
import { ActivatedRoute, RouterEvent, RouterLink } from '@angular/router';
import { tap, mergeMap } from 'rxjs/operators';
import {
  AsyncPipe,
  NgFor,
  NgForOf,
  NgIf,
  NumberFormatStyle,
} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [RouterLink, NgIf, AsyncPipe, NgFor, NgForOf],
  standalone: true,
})
export class DetailComponent implements OnInit {
  country$: Observable<Country>;
  borderCountries$: Observable<Country[]>;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.country$ = this.api.getCountryByName(params['country']).pipe(
        tap((res) => console.log(res)),
        mergeMap((res) => {
          if (res.borders && res.borders.length > 0) {
            this.borderCountries$ = this.api.getCountriesByCodes(res.borders);
          } else {
            this.borderCountries$ = of([]);
          }

          return of(res);
        })
      );
    });
  }

  displayCurrencies(currencies: Currency[] | undefined) {
    if (!currencies || !Array.isArray(currencies)) {
      return '';
    }

    return currencies.map((currency) => currency.name).join(', ');
  }

  displayLanguages(languages: Language[] | undefined) {
    if (!languages || !Array.isArray(languages)) {
      return '';
    }

    return languages.map((language) => language.name).join(', ');
  }
}
