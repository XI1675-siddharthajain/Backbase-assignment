import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';


import { Transaction } from './transactions.interface';
import { TransactionsRepository } from './transactions.repository';

describe('TransactionsRepository', (): void => {
  let repository: TransactionsRepository;
  let httpMock: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TransactionsRepository,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(TransactionsRepository);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  describe('getTransactions', (): void => {
    it('should return transactions', (done: DoneFn): void => {
      repository.getTransactions().subscribe((transactions: Transaction[]): void => {
        expect(transactions).toEqual(MOCKED_TRANSACTIONS_STATE.list);

        done();
      });

      const transactionRequest: TestRequest = httpMock.expectOne(
        `assets/transactions.json`,
      );
      expect(transactionRequest.request.method).toEqual('GET');
      transactionRequest.flush({data: MOCKED_TRANSACTIONS_STATE.list});

      httpMock.verify();

    });

    it('should throw error when request fails', (done: DoneFn): void => {
      const errorText: string = 'SOME_ERROR';

      repository.getTransactions().subscribe(
        (): void => null,
        (err: HttpErrorResponse): void => {
          expect(err.statusText).toEqual(errorText);

          done();
        });

      const transactionRequest: TestRequest = httpMock.expectOne(
        `assets/transactions.json`,
      );
      transactionRequest.error(new ErrorEvent(errorText), { statusText: errorText });
    });
  });
});
