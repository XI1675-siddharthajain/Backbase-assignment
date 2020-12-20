import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { reducers } from '@AppStore';
import { MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';
import { Spied } from '@Specs/types/utils.type';

import { TransactionsFacade } from '../../store/transactions.facade';
import { ListTransactionsResolver } from './list-transactions.resolver';

describe('ListTransactionsResolver', (): void => {
  let resolver: ListTransactionsResolver;
  let mockedTransactionsFacade: Spied<TransactionsFacade>;

  beforeEach((): void => {
    mockedTransactionsFacade = {
      ...jasmine.createSpyObj('TransactionsFacade', ['getTransactionsList']),
      transactionsList$: of(null, MOCKED_TRANSACTIONS_STATE.list),
      transactionsPending$: of(true, false),
    };

    TestBed.configureTestingModule({
      providers: [
        ListTransactionsResolver,
        {
          provide: TransactionsFacade,
          useValue: mockedTransactionsFacade,
        },
      ],
    });
    resolver = TestBed.inject(ListTransactionsResolver);
  });

  it('allow page to open once the transactions have been loaded into the app state', (done: DoneFn): void => {
    resolver.resolve().subscribe((value: boolean): void => {
      expect(value).toEqual(false);
      expect(mockedTransactionsFacade.getTransactionsList).toHaveBeenCalledTimes(1);
      expect(mockedTransactionsFacade.getTransactionsList).toHaveBeenCalledWith();

      done();
    });
  });
});
