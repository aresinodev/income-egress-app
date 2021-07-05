import { createAction, props } from '@ngrx/store';

import { IncomeEgress } from '../models/income-egress.model';

export const setItems = createAction('[Income and Egress] Set Items', props<{ items: IncomeEgress[] }>());
export const unsetItems = createAction('[Income and Egress] Unset Items');