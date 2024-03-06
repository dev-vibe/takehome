import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberFormattingService {
  private financialInputNum = signal(0);
  private financialInputTypeSignal = signal('');
  private formattedFinancialNumSignal = computed(() => {
    return this.formatNumber();
  });

  updateFinancialInput(input: string) {
    if (!input) {
      this.financialInputNum.set(0);
      this.financialInputTypeSignal.set('');
      return;
    }
    
    const parsedChar = input.slice(-1);
    let parsedNum: number = 0;

    if (isNaN(parseInt(parsedChar))) {
      parsedNum = parseFloat(input.toString().slice(0, -1));
    } else {
      parsedNum = parseFloat(input);
    }

    if (isNaN(parsedNum)) {
      parsedNum = 0;
    }
    
    this.financialInputNum.set(parsedNum);
    this.financialInputTypeSignal.set(parsedChar);
  }

  getFormattedFinancialNum() {
    return this.formattedFinancialNumSignal().toString();
  }

  private formatNumber(): string {
    let parsedNumber = '';
    if (this.financialInputTypeSignal().toLowerCase() === 'k') {
      parsedNumber = (this.financialInputNum() * 1000).toFixed(2);
    } else if (this.financialInputTypeSignal().toLowerCase() === 'm') {
      parsedNumber = (this.financialInputNum() * 1000000).toFixed(2);
    } else if (this.financialInputTypeSignal().toLowerCase() === 'b') {
      parsedNumber = (this.financialInputNum() * 1000000000).toFixed(2);
    } else {
      parsedNumber = (this.financialInputNum()).toFixed(2);
    }

    return Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(parseFloat(parsedNumber))
  }
}