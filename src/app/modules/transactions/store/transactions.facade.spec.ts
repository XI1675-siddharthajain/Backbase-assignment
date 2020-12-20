import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { State } from '@Interfaces/store.interface';
import { MOCKED_TRANSACTION, MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';
import { Spied } from '@Specs/types/utils.type';

import { Transaction } from '../shared/transactions.interface';
import { createTransaction, getTransactionsList, setPendingState } from './transactions.actions';
import { TransactionsFacade } from './transactions.facade';

describe('TransactionsFacade', (): void => {
  let facade: TransactionsFacade;
  let mockedStore: Spied<Store<State>>;

  beforeEach((): void => {
    mockedStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);

    TestBed.configureTestingModule({
      providers: [
        TransactionsFacade,
        { provide: Store, useValue: mockedStore },
      ],
    });

    facade = TestBed.inject(TransactionsFacade);
  });

  describe('setPendingState', (): void => {
    it('should dispatch setPendingState action', (): void => {
      const isPending: boolean = MOCKED_TRANSACTIONS_STATE.pending;

      facade.setPendingState(isPending);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(setPendingState({isPending}));
    });
  });

  describe('getTransactionsList', (): void => {
    it('should dispatch getTransactionsList action', (): void => {
      facade.getTransactionsList();

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(getTransactionsList());
    });
  });

  describe('createTransaction', (): void => {
    it('should dispatch createTransaction action', (): void => {
      const transaction: Transaction = MOCKED_TRANSACTION;

      facade.createTransaction(transaction);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(createTransaction({transaction}));
    });
  });
});
