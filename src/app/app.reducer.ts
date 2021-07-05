import { ActionReducerMap } from '@ngrx/store';

import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeEgress from './income/income.reducer';


export interface AppState {
  ui: ui.State,
  user: auth.State,
  incomesEgresses: incomeEgress.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomesEgresses: incomeEgress.incomeEgressReducer
}
