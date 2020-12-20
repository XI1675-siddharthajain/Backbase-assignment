import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  CreateTransactionSuccessActionType,
  GetTransactionsListErrorActionType,
  GetTransactionsListSuccessActionType,
} from '../shared/action.types';
import { Transaction } from '../shared/transactions.interface';
import { TransactionsRepository } from '../shared/transactions.repository';
import {
  createTransactionSuccess,
  getTransactionsListError,
  getTransactionsListSuccess,
  TransactionsActionsTypes,
} from './transactions.actions';
import { TransactionsFacade } from './transactions.facade';

@Injectable()
export class TransactionsEffects {
  public getTransactionsList$: CreateEffectMetadata = createEffect(
    (): Observable<GetTransactionsListSuccessActionType | GetTransactionsListErrorActionType> => (
      this.actions$
        .pipe(
          ofType(TransactionsActionsTypes.GetTransactionsList),
          switchMap((): Observable<Transaction[]> => this.transactionsRepository.getTransactions()),
          tap(this.setPendingStateToFalse.bind(this)),
          map((transactions: Transaction[]): GetTransactionsListSuccessActionType => getTransactionsListSuccess({transactions})),
          catchError((error: HttpErrorResponse): Observable<GetTransactionsListErrorActionType> => of(getTransactionsListError({error}))),
        )
    ),
  );

  public createTransaction$: CreateEffectMetadata = createEffect(
    (): Observable<CreateTransactionSuccessActionType> => (
      this.actions$
        .pipe(
          ofType(TransactionsActionsTypes.CreateTransaction),
          tap(this.setPendingStateToFalse.bind(this)),
          map(createTransactionSuccess),
        )
    ),
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly transactionsFacade: TransactionsFacade,
    private readonly transactionsRepository: TransactionsRepository,
  ) {
  }

  private setPendingStateToFalse(): void {
    this.transactionsFacade.setPendingState(false);
  }
}
