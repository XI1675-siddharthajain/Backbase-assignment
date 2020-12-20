import { ActionReducer } from '@ngrx/store';

import { TransactionsState } from '@Modules/transactions/store/transactions.state';

export interface LazyModules {
  transactions?: TransactionsState;
}

// TODO: To add shared states for example for user profile
// tslint:disable-next-line: no-empty-interface
export interface Shared {
}

export interface State extends LazyModules {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
