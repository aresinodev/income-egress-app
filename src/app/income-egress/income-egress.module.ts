import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';

import { StoreModule } from '@ngrx/store';
import { incomeEgressReducer } from './income-egress.reducer';

import { ChartsModule } from 'ng2-charts';

import { IncomeEgressComponent } from './income-egress.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { OrderIncomePipe } from '../pipes/order-income.pipe';

@NgModule({
  declarations: [
    IncomeEgressComponent,
    StatisticComponent,
    DetailComponent,
    OrderIncomePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomesEgresses', incomeEgressReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardModule
  ]
})
export class IncomeEgressModule { }
