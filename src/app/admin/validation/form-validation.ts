
import { AbstractControl } from '@angular/forms';

export class FormValidation {

  static getErrorMessage(control: AbstractControl): string {
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) {
      return 'This field is required.';
    }

    if (errors['minLength']) {
      return `Minimum ${errors['minlength'].requiredLength} characters required.`;
    }

   if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
    }


    if(errors['pattern']){
       return 'only number allowd'
    }


    if (errors['max']) {
      return `Maximum allowed value is ${errors['max'].max}`;
     }
    return 'Invalid field.';
  }
}
