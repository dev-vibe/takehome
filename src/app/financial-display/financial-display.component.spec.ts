import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialDisplayComponent } from './financial-display.component';
import { NumberFormattingService } from '../number-formatting-service.service';
import { CommonModule } from '@angular/common';

describe('FinancialDisplayComponent', () => {
  let component: FinancialDisplayComponent;
  let fixture: ComponentFixture<FinancialDisplayComponent>;
  let numberFormattingService: NumberFormattingService;

  beforeEach(async () => {
    const numberFormattingServiceMock = {
      getFormattedFinancialNum: jasmine.createSpy('getFormattedFinancialNum').and.returnValue('1,000k')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, FinancialDisplayComponent],
      providers: [
        { provide: NumberFormattingService, useValue: numberFormattingServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialDisplayComponent);
    component = fixture.componentInstance;
    numberFormattingService = TestBed.inject(NumberFormattingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display formatted number after ngOnInit', () => {
    // Todo: investigate how to test ngOnInit with a correct mock, including navigation between routes
  });

  it('should render "Go to Financial Input" button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Go Back');
  });
});
