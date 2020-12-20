import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TransactionsFacade } from '../../store/transactions.facade';

@Injectable()
export class ListTransactionsResolver implements Resolve<Observable<boolean>> {

  public constructor(
    private readonly transactionsFacade: TransactionsFacade,
  ) {
  }

  public resolve(): Observable<boolean> {
    this.transactionsFacade.getTransactionsList();

    return this.transactionsFacade.transactionsList$
      .pipe(
        switchMap((): Observable<boolean> => this.transactionsFacade.transactionsPending$),
        filter((pending: boolean): boolean => !pending),
        take(1),
      );
  }
}
