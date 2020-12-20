// tslint:disable: max-line-length
import { createAction, props } from '@ngrx/store';

import { ActionCreatorPropsType, ActionCreatorType } from '@Types/action.types';

import {
  CreateTransactionProps,
  CreateTransactionSuccessProps,
  ErrorProps,
  GetTransactionsListSuccessProps,
  PendingProps,
} from '../shared/action.props';

export enum TransactionsActionsTypes {
  Pending = '[Transactions] PENDING',

  GetTransactionsList = '[Transactions] GET_TRANSACTIONS_LIST',
  GetTransactionsListSuccess = '[Transactions] GET_TRANSACTIONS_SUCCESS',
  GetTransactionsListError = '[Transactions] GET_TRANSACTIONS_ERROR',

  CreateTransaction = '[Transactions] CREATE_TRANSACTION',
  CreateTransactionSuccess = '[Transactions] CREATE_TRANSACTION_SUCCESS',
}

export const setPendingState: ActionCreatorPropsType<TransactionsActionsTypes.Pending, PendingProps> = createAction(TransactionsActionsTypes.Pending, props<PendingProps>());

export const getTransactionsList: ActionCreatorType<TransactionsActionsTypes.GetTransactionsList> = createAction(TransactionsActionsTypes.GetTransactionsList);
export const getTransactionsListSuccess: ActionCreatorPropsType<TransactionsActionsTypes.GetTransactionsListSuccess, GetTransactionsListSuccessProps> = createAction(TransactionsActionsTypes.GetTransactionsListSuccess, props<GetTransactionsListSuccessProps>());
export const getTransactionsListError: ActionCreatorPropsType<TransactionsActionsTypes.GetTransactionsListError, ErrorProps> = createAction(TransactionsActionsTypes.GetTransactionsListError, props<ErrorProps>());

export const createTransaction: ActionCreatorPropsType<TransactionsActionsTypes.CreateTransaction, CreateTransactionProps> = createAction(TransactionsActionsTypes.CreateTransaction, props<CreateTransactionProps>());
export const createTransactionSuccess: ActionCreatorPropsType<TransactionsActionsTypes.CreateTransactionSuccess, CreateTransactionSuccessProps> = createAction(TransactionsActionsTypes.CreateTransactionSuccess, props<CreateTransactionSuccessProps>());
