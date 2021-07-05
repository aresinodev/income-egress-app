import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../auth/auth.actions';

import { IncomeEgressService } from '../services/income-egress.service';
import { IncomeEgress } from '../models/income-egress.model';

@Component({
  selector: 'app-income-egress',
  templateUrl: './income-egress.component.html',
  styles: [
  ]
})
export class IncomeEgressComponent implements OnInit, OnDestroy {
  incomeForm!: FormGroup;
  type: string = 'income';
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private incomeEgressSvc: IncomeEgressService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.incomeForm = this.formBuilder.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.uiSubscription = this.store
                          .select('ui')
                          .subscribe(({ isLoading }) => (this.loading = isLoading));
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  save(): void {
    this.store.dispatch(ui.isLoading());

    const { description, quantity } = this.incomeForm.value;
    const incomeEgress = new IncomeEgress(description, quantity, this.type);

    this.incomeEgressSvc.createIncomeOrEgress(incomeEgress)
    .then(() => {
      this.store.dispatch(ui.stopLoading());
      this.incomeForm.reset();
      Swal.fire('Registro creado', description, 'success');
    })
    .catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', description, 'error');
    });
  }
}
