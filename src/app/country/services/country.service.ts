import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';

  private httpClient = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this.regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.httpClient.get<Country[]>(url);
  }
}
