import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppStateWithIncomesEgresses } from '../income-egress.reducer';

import Swal from 'sweetalert2';

import { IncomeEgress } from '../../models/income-egress.model';
import { IncomeEgressService } from '../../services/income-egress.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  incomesEgresses: IncomeEgress[] = [];
  incomesSubs!: Subscription;

  constructor(private store: Store<AppStateWithIncomesEgresses>,
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
