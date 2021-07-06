import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../income-egress/income-egress.actions';

import { Subscription } from 'rxjs';

import { IncomeEgressService } from '../services/income-egress.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription;
  incomesSubs!: Subscription;

  constructor(private store: Store<AppState>,
              private incomeEgressSvc: IncomeEgressService) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user !== null)
    )
    .subscribe(({ user }) => {
      this.incomesSubs = this.incomeEgressSvc.incomesEgressesListener(user.uid)
      .subscribe((incomesEgresses: any) => {
        this.store.dispatch(setItems({ items: incomesEgresses }));
      });
    });
  }

  ngOnDestroy(): void {
    this.incomesSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
