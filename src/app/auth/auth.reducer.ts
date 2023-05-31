import { Action, createReducer, on } from '@ngrx/store';
import { setUser } from './auth.actions';
import { Usuario } from './models/usuario.models';
import * as actions from './auth.actions'

export interface State {
  user: Usuario | null;
}

export const initialState: State = {
  user: null,
}

const _authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, { user}) => ({ ...state, user: { ...user } })),
  on(actions.unSetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: State = initialState, action: Action) {
  return _authReducer(state, action);
}
