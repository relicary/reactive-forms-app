import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';

  private httpClient = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.httpClient.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    if (!alphaCode) return of();

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.httpClient.get<Country>(url);
  }

  getCountriesByCountryCodes(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequest: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);

      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }
}
