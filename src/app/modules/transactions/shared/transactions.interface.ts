export interface Dates {
  valueDate: string | number;
}

export interface AmountCurrency {
  amount: string | number;
  currencyCode: string;
}

export interface TransactionDetails {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: string;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface Transaction {
  categoryCode: string;
  dates: Dates;
  transaction: TransactionDetails;
  merchant: Merchant;
}

export interface TransactionsData {
  data: Transaction[];
}
