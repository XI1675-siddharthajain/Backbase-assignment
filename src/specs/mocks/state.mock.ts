import { State } from '@Interfaces/store.interface';

import { MOCKED_TRANSACTIONS_STATE } from './transactions.mock';

export const MOCKED_STATE: State = {
  shared: {
  },
  transactions: MOCKED_TRANSACTIONS_STATE,
};
