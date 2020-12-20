
import { State } from '@Interfaces/store.interface';
import { MOCKED_STATE } from '@Mocks/state.mock';
import { MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';

import { Transaction } from '../shared/transactions.interface';
import { transactionsSelectors } from './transactions.selectors';

describe('TransactionsSelectors', (): void => {
  const state: State = MOCKED_STATE;

  it('selectTransactionsList', (): void => {
    const result: Transaction[] = transactionsSelectors.selectTransactionsList(state);

    expect(result).toEqual(MOCKED_TRANSACTIONS_STATE.list);
  });

  it('selectTransactionsPending', (): void => {
    const result: boolean = transactionsSelectors.selectTransactionsPending(state);

    expect(result).toEqual(MOCKED_TRANSACTIONS_STATE.pending);
  });

  it('selectUserBalance', (): void => {
    const result: number = transactionsSelectors.selectUserBalance(state);

    expect(result).toEqual(MOCKED_TRANSACTIONS_STATE.userBalance);
  });
});
