import { createReducer, on } from '@ngrx/store';

import { setItems, unsetItems } from './income-egress.actions';

import { IncomeEgress } from '../models/income-egress.model';

export interface State {
    items: IncomeEgress[]; 
}

export const initialState: State = {
   items: [],
}

const _incomeEgressReducer = createReducer(initialState,
    on(setItems, (state, { items }: any) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] }))
);

export function incomeEgressReducer(state, action) {
    return _incomeEgressReducer(state, action);
}
