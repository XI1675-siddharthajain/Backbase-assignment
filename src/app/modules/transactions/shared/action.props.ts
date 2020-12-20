import { HttpErrorResponse } from '@angular/common/http';

import { Transaction } from './transactions.interface';

export interface GetTransactionsListSuccessProps {
  transactions: Transaction[];
}

export interface CreateTransactionProps {
  transaction: Transaction;
}

export type CreateTransactionSuccessProps = CreateTransactionProps;

export interface ErrorProps {
  error: HttpErrorResponse;
}

export interface PendingProps {
  isPending: boolean;
}
