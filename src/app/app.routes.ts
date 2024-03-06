import { Routes } from '@angular/router';
import { FinancialInputComponent } from './financial-input/financial-input.component';
import { FinancialDisplayComponent } from './financial-display/financial-display.component';

export const routes: Routes = [
    { path: 'input', component: FinancialInputComponent },
    { path: 'output', component: FinancialDisplayComponent},
    { path: '', redirectTo: '/input', pathMatch: 'full' },
];
