import { createReducer, on } from '@ngrx/store';

import { setItems, unsetItems } from './income-egress.actions';

import { IncomeEgress } from '../models/income-egress.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IncomeEgress[]; 
}

export interface AppStateWithIncomesEgresses extends AppState {
    incomesEgresses: State;
}

export const initialState: State = {
   items: [],
}

const _incomeEgressReducer = createReducer(initialState,
    on(setItems, (state, { items }: any) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] }))
);

export function incomeEgressReducer(state: any, action: any) {
    return _incomeEgressReducer(state, action);
}
