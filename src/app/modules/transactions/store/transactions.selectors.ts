
import { State } from '@Interfaces/store.interface';

import { Transaction } from '../shared/transactions.interface';

interface TransactionsSelectors {
  selectTransactionsList(state: State): Transaction[];
  selectTransactionsPending(state: State): boolean;
  selectUserBalance(state: State): number;
}

export const transactionsSelectors: TransactionsSelectors = {
  selectTransactionsList: (state: State): Transaction[] => state.transactions.list,
  selectTransactionsPending: (state: State): boolean => state.transactions.pending,
  selectUserBalance: (state: State): number => state.transactions.userBalance,
};
