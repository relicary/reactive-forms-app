import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  private formBuilder = inject(FormBuilder);

  myForm = this.formBuilder.group({
    name: [
      '',
      /* Sync Validators*/
      [
        Validators.required,
        Validators.minLength(3)
      ],
      /* Async Validators */ [],
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(10)
      ]
    ],
    inStorage: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],
  });

}
