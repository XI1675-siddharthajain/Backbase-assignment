import { Transaction } from '@Modules/transactions/shared/transactions.interface';
import { TransactionsState } from '@Modules/transactions/store/transactions.state';

import { MOCKED_HTTP_ERROR_RESPONSE } from './http-error-response.mock';

export const MOCKED_TRANSACTION: Transaction = {
  categoryCode: '#a2a580',
  dates: {
    valueDate: 1600493600000,
  },
  transaction: {
    amountCurrency: {
      amount: 5000,
      currencyCode: 'EUR',
    },
    type: 'Salaries',
    creditDebitIndicator: 'CRDT',
  },
  merchant: {
    name: 'Backbase',
    accountNumber: 'SI64397745065188826',
  },
};

export const MOCKED_TRANSACTION2: Transaction = {
  categoryCode: '#b12020',
  dates: {
    valueDate: 1600300800000,
  },
  transaction: {
    amountCurrency: {
      amount: 84.76,
      currencyCode: 'EUR',
    },
    type: 'Card Payment',
    creditDebitIndicator: 'DBIT',
  },
  merchant: {
    name: 'The Tea Lounge',
    accountNumber: 'SI64397745065188826',
  },
};

export const MOCKED_TRANSACTION3: Transaction = {
  categoryCode: '#c51271',
  dates: {
    valueDate: '2020-09-19',
  },
  transaction: {
    amountCurrency: {
      amount: 84.64,
      currencyCode: 'EUR',
    },
    type: 'Card Payment',
    creditDebitIndicator: 'DBIT',
  },
  merchant: {
    name: 'Texaco',
    accountNumber: 'SI64397745065188826',
  },
};

export const MOCKED_TRANSACTIONS_STATE: TransactionsState = {
  userBalance: 5824.76,
  list: [MOCKED_TRANSACTION],
  pending: true,
  error: MOCKED_HTTP_ERROR_RESPONSE,
};
