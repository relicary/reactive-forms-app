import { Routes } from '@angular/router';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
     {
      path: '',
      component: CountryPageComponent
     }
    ]
  }
]
