import { HttpErrorResponse } from '@angular/common/http';

import { Transaction } from '../shared/transactions.interface';

export interface TransactionsState {
  userBalance: number;
  list: Transaction[];
  pending: boolean;
  error: HttpErrorResponse;
}
