import { TestBed } from '@angular/core/testing';
import { NumberFormattingService } from './number-formatting-service.service';

describe('NumberFormattingService', () => {
  let service: NumberFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly update financial input without suffix', () => {
    service.updateFinancialInput('123');
    expect(service.getFormattedFinancialNum()).toEqual('123.00');
  });

  it('should correctly format numbers with "k" suffix', () => {
    service.updateFinancialInput('123k');
    expect(service.getFormattedFinancialNum()).toEqual('123,000.00');
  });

  it('should correctly format numbers with "m" suffix', () => {
    service.updateFinancialInput('1.1m');
    expect(service.getFormattedFinancialNum()).toEqual('1,100,000.00');
  });

  it('should correctly format numbers with "b" suffix', () => {
    service.updateFinancialInput('2.5b');
    expect(service.getFormattedFinancialNum()).toEqual('2,500,000,000.00');
  });

  it('should handle numeric input without altering value', () => {
    service.updateFinancialInput('250');
    expect(service.getFormattedFinancialNum()).toEqual('250.00');
  });

  it('should correctly handle negative numbers', () => {
    service.updateFinancialInput('-123');
    expect(service.getFormattedFinancialNum()).toEqual('-123.00');
  });

  it('should correctly handle negative numbers with suffix', () => {
    service.updateFinancialInput('-123k');
    expect(service.getFormattedFinancialNum()).toEqual('-123,000.00');
  });

  it('should handle input with only a suffix (assuming 0 as the number)', () => {
    service.updateFinancialInput('k');
    expect(service.getFormattedFinancialNum()).toEqual('0.00');
  });

  it('should correctly format very large numbers', () => {
    service.updateFinancialInput('123456789b');
    expect(service.getFormattedFinancialNum()).toEqual('123,456,789,000,000,000.00');
  });

  it('should correctly handle floating point numbers without a suffix', () => {
    service.updateFinancialInput('12.7');
    expect(service.getFormattedFinancialNum()).toEqual('12.70');
  });

  it('should handle spaces between number and suffix correctly', () => {
    service.updateFinancialInput('123 k');
    expect(service.getFormattedFinancialNum()).toEqual('123,000.00');
  });

  // Todo: implement features for below edge cases

  // it('should ignore non-numeric characters at the start of the input', () => {
  //   // This test assumes your service should handle or strip invalid characters at the start.
  //   service.updateFinancialInput('$123.45');
  //   expect(service.getFormattedFinancialNum()).toEqual('123.45');
  // });

  // it('should return "0.00" for completely invalid inputs', () => {
  //   service.updateFinancialInput('abc');
  //   expect(service.getFormattedFinancialNum()).toEqual('0.00');
  // });
});