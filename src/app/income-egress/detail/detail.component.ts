import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IncomeEgress } from 'src/app/models/income-egress.model';
import { IncomeEgressService } from 'src/app/services/income-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  incomesEgresses: IncomeEgress[] = [];
  incomesSubs!: Subscription;

  constructor(private store: Store<AppState>,
              private incomeEgressSvc: IncomeEgressService) { }

  ngOnInit(): void {
    this.incomesSubs = this.store.select('incomesEgresses')
    .subscribe(({ items }) => this.incomesEgresses = items);
  }

  ngOnDestroy() {
    this.incomesSubs.unsubscribe();
  }

  delete(uid: string): void {
    this.incomeEgressSvc.deleteIncomeEgress(uid)
    .then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    })
    .catch((err) => {
      Swal.fire('Error', err.message, 'error');
    });
  }
}
