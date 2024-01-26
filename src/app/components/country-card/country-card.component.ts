import { NgFor, NgIf, NumberFormatStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Country } from '../../types/api';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [NgIf, HomeComponent, NgFor, RouterLink],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss',
})
export class CountryCardComponent {
  @Input()
  country: Country;
}
