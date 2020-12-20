import { ActionReducer, createReducer, on } from '@ngrx/store';

import { CreateTransactionSuccessProps, ErrorProps, GetTransactionsListSuccessProps } from '../shared/action.props';
import { SetPendingActionType } from '../shared/action.types';
import {
  createTransaction,
  createTransactionSuccess,
  getTransactionsList,
  getTransactionsListError,
  getTransactionsListSuccess,
  setPendingState,
  TransactionsActionsTypes,
} from './transactions.actions';
import { TransactionsState } from './transactions.state';

export const transactionsInitialState: TransactionsState = {
  userBalance: 5824.76,
  list: [],
  pending: false,
  error: null,
};

export const transactionsReducer: ActionReducer<TransactionsState> = createReducer(
  transactionsInitialState,
  on(setPendingState, (state: TransactionsState, action: SetPendingActionType<TransactionsActionsTypes.Pending>): TransactionsState => ({
    ...state,
    pending: action.isPending,
  })),
  on(
    getTransactionsList,
    createTransaction,
    (state: TransactionsState): TransactionsState => ({
      ...state,
      pending: true,
    }),
  ),
  on(getTransactionsListSuccess, (state: TransactionsState, action: GetTransactionsListSuccessProps): TransactionsState => ({
    ...state,
    list: action.transactions,
  })),
  on(createTransactionSuccess, (state: TransactionsState, action: CreateTransactionSuccessProps): TransactionsState => ({
      ...state,
      userBalance: Number(parseFloat(
        (Number(state.userBalance) - Number(action.transaction.transaction.amountCurrency.amount)).toString(),
      ).toFixed(2)),
      list: [
        action.transaction,
        ...state.list,
      ],
  })),
  on(
    getTransactionsListError,
    (state: TransactionsState, action: ErrorProps): TransactionsState => ({
    ...state,
    error: action.error,
  })),
);
