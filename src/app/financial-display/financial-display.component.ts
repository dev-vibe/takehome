import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NumberFormattingService } from '../number-formatting-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'financial-display',
  templateUrl: './financial-display.component.html',
  styleUrls: ['./financial-display.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class FinancialDisplayComponent implements OnInit {
  formattedNumber: string = '';

  constructor(private numberFormattingService: NumberFormattingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formattedNumber = this.numberFormattingService.getFormattedFinancialNum();
  }
}