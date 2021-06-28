import { Routes } from '@angular/router';

import { IncomeEgressComponent } from './../income-egress/income-egress.component';
import { StatisticComponent } from './../income-egress/statistic/statistic.component';
import { DetailComponent } from './../income-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'income-egress', component: IncomeEgressComponent },
    { path: 'detail', component: DetailComponent },
];
