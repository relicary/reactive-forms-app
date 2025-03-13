import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private formBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      /* Sync Validators*/
      [Validators.required, Validators.minLength(3)],
      /* Async Validators */ [],
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  isValidField(fieldName: string): boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This fields requires ${errors['minlength'].requiredLength} chars at least`;
        case 'min':
          return `The minimum value is ${errors['min']}.min `;
      }
    }

    return null;
  }
}
