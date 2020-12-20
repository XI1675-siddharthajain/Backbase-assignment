// tslint:disable: max-line-length
import { TypedActionProps } from '@Types/action.types';

import { TransactionsActionsTypes } from '../store/transactions.actions';
import { CreateTransactionSuccessProps, ErrorProps, GetTransactionsListSuccessProps, PendingProps } from './action.props';

export type GetTransactionsListSuccessActionType = TypedActionProps<TransactionsActionsTypes.GetTransactionsListSuccess, GetTransactionsListSuccessProps>;
export type GetTransactionsListErrorActionType = TypedActionProps<TransactionsActionsTypes.GetTransactionsListError, ErrorProps>;
export type CreateTransactionSuccessActionType = TypedActionProps<TransactionsActionsTypes.CreateTransactionSuccess, CreateTransactionSuccessProps>;
export type SetPendingActionType<T extends string> = TypedActionProps<T, PendingProps>;
