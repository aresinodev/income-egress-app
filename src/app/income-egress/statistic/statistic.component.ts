import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label } from 'ng2-charts';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IncomeEgress } from 'src/app/models/income-egress.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {
  incomes: number = 0;
  egresses: number = 0;
  totalIncomes: number = 0;
  totalEgresses: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: MultiDataSet = [[]];


  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('incomesEgresses')
    .subscribe(({ items }) => {
      this.generateStatistics(items);
    })
  }

  generateStatistics(items: IncomeEgress[]): void {
    this.totalIncomes = 0;
    this.totalEgresses = 0;
    this.incomes = 0;
    this.egresses = 0;
    
    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes += item.quantity;
        this.incomes++;
      } else {
        this.totalEgresses += item.quantity;
        this.egresses++;
      }
    }

    this.doughnutChartData = [
      [this.totalIncomes, this.totalEgresses]
    ];
  }
}
