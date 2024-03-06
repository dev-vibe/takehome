import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberFormattingService } from '../number-formatting-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './financial-input.component.html',
  styleUrl: './financial-input.component.css'
})

export class FinancialInputComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private numberFormattingService: NumberFormattingService, private router: Router) { }

  ngOnInit() {
    this.inputForm = new FormGroup({
      numberInput: new FormControl('', [Validators.required, this.customValidator])
    });
  }

  shouldDisplayError(controlName: string, errorName: string): boolean {
    const control = this.inputForm.get(controlName);
    console.log('control', control?.value);
    return !!control && control.touched && control?.value && control.hasError(errorName);
  }

  customValidator(control: FormControl): { [key: string]: any } | null {
    console.log('control.value', control.value);
    const value = control.value;
    const regex = /^-?[0-9]+(\.[0-9]+)?[kmb]?$/i;
    return !regex.test(value) ? { invalidFormat: true } : null;
  }

  onSubmit() {
    if (this.inputForm.valid) {
      console.log('Form Submitted!');
      console.log('Number input:', typeof this.inputForm.value.numberInput);
      this.numberFormattingService.updateFinancialInput(this.inputForm.value.numberInput);
      this.router.navigate(['/output']);
    }
  }
}
