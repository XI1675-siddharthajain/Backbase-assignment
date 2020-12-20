import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable, of, Subject, throwError } from 'rxjs';
import { mapTo, switchMap, take, tap } from 'rxjs/operators';

import { MOCKED_TRANSACTION, MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';
import { Spied } from '@Specs/types/utils.type';

import { Transaction } from '../shared/transactions.interface';
import { TransactionsRepository } from '../shared/transactions.repository';
import { createTransaction, getTransactionsList, TransactionsActionsTypes } from './transactions.actions';
import { TransactionsEffects } from './transactions.effects';
import { TransactionsFacade } from './transactions.facade';

describe('TransactionsEffects', (): void => {
  // tslint:disable-next-line: no-any
  const error: any = { error: 'someError' };
  let effects: TransactionsEffects;
  let mockedTransactionsRepository: Spied<TransactionsRepository>;
  let mockedTransactionsFacade: Spied<TransactionsFacade>;
  // tslint:disable-next-line: no-any
  let actionsSubject: Subject<any>;
  // tslint:disable-next-line: no-any
  let mockedActions$: Observable<any>;

  beforeEach((): void => {
    actionsSubject = new Subject();
    mockedActions$ = actionsSubject.asObservable();

    mockedTransactionsRepository = jasmine.createSpyObj('TransactionsRepository', [
      'getTransactions',
      'createTransaction',
    ]);

    mockedTransactionsFacade = {
      ...jasmine.createSpyObj('TransactionsFacade', ['setPendingState']),
    };

    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        {
          provide: Actions,
          useValue: mockedActions$,
        },
        {
          provide: TransactionsFacade,
          useValue: mockedTransactionsFacade,
        },
        {
          provide: TransactionsRepository,
          useValue: mockedTransactionsRepository,
        },
      ],
    });

    effects = TestBed.inject(TransactionsEffects);
  });

  describe('getTransactionsList$', (): void => {
    it('should call getTransactions and emit getTransactionsListSuccess', (done: DoneFn): void => {
      mockedTransactionsRepository.getTransactions.and.returnValue(of(MOCKED_TRANSACTIONS_STATE.list));

      (<Observable<Transaction>><unknown>effects.getTransactionsList$)
        .pipe(take(1))
        // tslint:disable-next-line: no-any
        .subscribe((action: any): void => {
          expect(action.type).toEqual(TransactionsActionsTypes.GetTransactionsListSuccess);

          done();
        });

      actionsSubject.next(getTransactionsList());

      expect(mockedTransactionsRepository.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedTransactionsRepository.getTransactions).toHaveBeenCalledWith();
    });

    it('should call getTransactions and emit getTransactionsListError', (done: DoneFn): void => {
      mockedTransactionsRepository.getTransactions.and.returnValue(throwError(error));

      (<Observable<Transaction>><unknown>effects.getTransactionsList$)
        .pipe(take(1))
        // tslint:disable-next-line: no-any
        .subscribe((action: any): void => {
          expect(action.type).toEqual(TransactionsActionsTypes.GetTransactionsListError);

          done();
        });

      actionsSubject.next(getTransactionsList());

      expect(mockedTransactionsRepository.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedTransactionsRepository.getTransactions).toHaveBeenCalledWith();
    });
  });

  describe('createTransaction$', (): void => {
    it('should call createTransaction and emit createTransactionSuccess', (done: DoneFn): void => {
      const transaction: Transaction = MOCKED_TRANSACTION;

      (<Observable<Transaction>><unknown>effects.createTransaction$)
        .pipe(take(1))
        // tslint:disable-next-line: no-any
        .subscribe((action: any): void => {
          expect(action.type).toEqual(TransactionsActionsTypes.CreateTransactionSuccess);

          done();
        });

      actionsSubject.next(createTransaction({transaction}));

      expect(mockedTransactionsFacade.setPendingState).toHaveBeenCalledTimes(1);
      expect(mockedTransactionsFacade.setPendingState).toHaveBeenCalledWith(false);
    });
  });
});
