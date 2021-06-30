import { createReducer, on } from "@ngrx/store";

import * as auth from "./auth.actions";

import { User } from "../models/user.model";

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(auth.setUser, (state, { user }) => ({ ...state, user })),
  on(auth.unsetUser, state => ({ ...state, user: null }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
