import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@Interfaces/store.interface';

import { Transaction } from '../shared/transactions.interface';
import { createTransaction, getTransactionsList, setPendingState } from './transactions.actions';
import { transactionsSelectors } from './transactions.selectors';

@Injectable()
export class TransactionsFacade {
  public transactionsList$: Observable<Transaction[]> = this.store
    .pipe(select(transactionsSelectors.selectTransactionsList));
  public transactionsPending$: Observable<boolean> = this.store
    .pipe(select(transactionsSelectors.selectTransactionsPending));
  public userBalance$: Observable<number> = this.store
    .pipe(select(transactionsSelectors.selectUserBalance));

  public constructor(
    private readonly store: Store<State>,
  ) {
  }

  public setPendingState(isPending: boolean): void {
    this.store.dispatch(setPendingState({isPending}));
  }

  public getTransactionsList(): void {
    this.store.dispatch(getTransactionsList());
  }

  public createTransaction(transaction: Transaction): void {
    this.store.dispatch(createTransaction({transaction}));
  }
}
