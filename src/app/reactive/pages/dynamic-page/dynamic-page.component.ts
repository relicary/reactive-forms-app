import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Mario Kart', Validators.required],
      ],
      Validators.minLength(3)
    ),
  });

  newFavourite = new FormControl('', Validators.required);

  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  onAddToFavourites() {
    if (this.newFavourite.invalid) return;

    const newGame = this.newFavourite.value;

    this.favouriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavourite.reset();
  }

  onDeleteFavourite(index: number) {
    this.favouriteGames.removeAt(index);
  }
}
