import { MOCKED_HTTP_ERROR_RESPONSE } from '@Mocks/http-error-response.mock';
import { MOCKED_TRANSACTION, MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';

import { Transaction } from '../shared/transactions.interface';
import {
  createTransaction,
  createTransactionSuccess,
  getTransactionsList,
  getTransactionsListError,
  getTransactionsListSuccess,
  setPendingState,
} from './transactions.actions';
import { transactionsInitialState, transactionsReducer } from './transactions.reducers';
import { TransactionsState } from './transactions.state';

describe('transactionsReducer', (): void => {
  // tslint:disable-next-line: no-any
  const requestSendingActions: any[] = [
    getTransactionsList(),
    createTransaction({transaction: MOCKED_TRANSACTION}),
  ];
  // tslint:disable-next-line: no-any
  const errorAddingActions: any[] = [
    getTransactionsListError({error: MOCKED_HTTP_ERROR_RESPONSE}),
  ];
  const pendingState: TransactionsState = {
    ...transactionsInitialState,
    pending: true,
    error: null,
  };
  const errorState: TransactionsState = {
    ...transactionsInitialState,
    pending: false,
    error: MOCKED_HTTP_ERROR_RESPONSE,
  };
  // tslint:disable-next-line: no-any
  const singleTestForGenericAction: (description: string, action: any, outputState: TransactionsState) => void =
  // tslint:disable-next-line: no-any
  (description: string, action: any, outputState: TransactionsState): void => {
    it(`${description} for ${action.type} action`, (): void => {
      const state: TransactionsState = transactionsReducer(
        transactionsInitialState,
        action,
      );

      expect(state).not.toBe(MOCKED_TRANSACTIONS_STATE);
      expect(state).toEqual(outputState);
    });
  };

  describe('Request Actions', (): void => {
    it('should set state to initial state when passed state is undefined', (): void => {
      const undefinedState: TransactionsState = undefined;
      const state: TransactionsState = transactionsReducer(
        undefinedState,
        // tslint:disable-next-line: no-any
        <any>'SOME_ACTION',
      );

      expect(state).toBe(transactionsInitialState);
    });

    describe('request sending actions', (): void => {
      requestSendingActions.forEach(
        // tslint:disable-next-line: no-any
        (action: any): void => {
          singleTestForGenericAction('should add pending flag', action, pendingState);
        },
      );
    });

    describe('Error Actions', (): void => {
      errorAddingActions.forEach(
        // tslint:disable-next-line: no-any
        (action: any): void => {
          singleTestForGenericAction('should add pending flag', action, errorState);
        },
      );
    });

    describe('Success Actions', (): void => {
      it('should set TransactionsState.pending to isPending', (): void => {
        const isPending: boolean = MOCKED_TRANSACTIONS_STATE.pending;
        const state: TransactionsState = transactionsReducer(
          transactionsInitialState,
          setPendingState({isPending}),
        );

        expect(state).not.toBe(transactionsInitialState);
        expect(state).toEqual({
          ...transactionsInitialState,
          pending: isPending,
          error: null,
        });
      });

      it('should set TransactionsState.pending to isPending', (): void => {
        const isPending: boolean = MOCKED_TRANSACTIONS_STATE.pending;
        const state: TransactionsState = transactionsReducer(
          transactionsInitialState,
          setPendingState({isPending}),
        );

        expect(state).not.toBe(transactionsInitialState);
        expect(state).toEqual({
          ...transactionsInitialState,
          pending: isPending,
          error: null,
        });
      });

      it('should set TransactionsState.list to returned list', (): void => {
        const transactions: Transaction[] = MOCKED_TRANSACTIONS_STATE.list;
        const state: TransactionsState = transactionsReducer(
          transactionsInitialState,
          getTransactionsListSuccess({transactions}),
        );

        expect(state).not.toBe(transactionsInitialState);
        expect(state).toEqual({
          ...transactionsInitialState,
          list: transactions,
        });
      });

      it('should append added transaction to TransactionsState.list', (): void => {
        const transaction: Transaction = MOCKED_TRANSACTION;
        const state: TransactionsState = transactionsReducer(
          transactionsInitialState,
          createTransactionSuccess({transaction}),
        );

        expect(state).not.toBe(transactionsInitialState);
        expect(state).toEqual({
          ...transactionsInitialState,
          userBalance: Number(parseFloat(
            (Number(transactionsInitialState.userBalance) - Number(transaction.transaction.amountCurrency.amount)).toString(),
          ).toFixed(2)),
          list: [
            transaction,
            ...transactionsInitialState.list,
          ],
        });
      });
    });
  });
});
