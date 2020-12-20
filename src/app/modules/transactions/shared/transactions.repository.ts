import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction, TransactionsData } from './transactions.interface';

@Injectable()
export class TransactionsRepository {

  public constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get('assets/transactions.json')
      .pipe(map((transactionsData: TransactionsData): Transaction[] => transactionsData.data));
  }
}
