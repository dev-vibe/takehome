import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialInputComponent } from './financial-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NumberFormattingService } from '../number-formatting-service.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('FinancialInputComponent', () => {
  let component: FinancialInputComponent;
  let fixture: ComponentFixture<FinancialInputComponent>;
  let numberFormattingService: NumberFormattingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), // Adjust if specific routes are needed
        FinancialInputComponent,
      ],
      providers: [
        {
          provide: NumberFormattingService,
          useValue: jasmine.createSpyObj('NumberFormattingService', ['updateFinancialInput'])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    numberFormattingService = TestBed.inject(NumberFormattingService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should validate number input correctly', () => {
    let numberInput = component.inputForm.controls['numberInput'];
  
    if (!numberInput) {
      fail('numberInput control does not exist');
    }
  
    numberInput.setValue('');
    numberInput.markAsTouched();

    expect(numberInput.valid).toBeFalsy();
  
    numberInput.setValue('0');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('123');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('123.45');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('-123.45');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('123k');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('123m');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('123b');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('-123b');
    expect(numberInput.valid).toBeTruthy();
  
    numberInput.setValue('sdfsdf');
    expect(numberInput.valid).toBeFalsy();
  
    numberInput.setValue('k50');
    expect(numberInput.valid).toBeFalsy();
  
    numberInput.setValue('123.456');
    expect(numberInput.valid).toBeTruthy();
  });
  

  it('should display error when invalid format is used', () => {
    component.inputForm.controls['numberInput'].setValue('invalid');
    component.inputForm.controls['numberInput'].markAsTouched();
    fixture.detectChanges();

    const invalidFormatError = component.shouldDisplayError('numberInput', 'invalidFormat');
    expect(invalidFormatError).toBeTruthy();

    const errorElement = fixture.debugElement.query(By.css('.error-invalidFormat'));
    if(errorElement) {
      expect(errorElement.nativeElement.textContent).toContain('Invalid format');
    } else {
      fail('Error element for invalid format not found');
    }
  });

  it('should navigate to output page on submit with valid data', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.inputForm.controls['numberInput'].setValue('100k');
    component.onSubmit();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith(['/output']);
  });
  
});
