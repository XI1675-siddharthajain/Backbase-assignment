import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SortableColumns } from '@Consts/sortable-columns.enum';
import { MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3 } from '@Mocks/transactions.mock';
import { TranslateTestingModule } from '@Mocks/translate.mock.spec';
import { Spied } from '@Specs/types/utils.type';

import { TransactionsFacade } from '../../store/transactions.facade';
import { ListTransactionsComponent } from './list-transactions.component';

describe('ListTransactionsComponent', (): void => {
  let component: ListTransactionsComponent;
  let fixture: ComponentFixture<ListTransactionsComponent>;
  let mockedTransactionsFacade: Spied<TransactionsFacade>;

  beforeEach(async(): Promise<void> => {
    mockedTransactionsFacade = {
      ...jasmine.createSpyObj('TransactionsFacade', ['getTransactionsList']),
      transactionsList$: of([MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]),
    };
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
      ],
      declarations: [
        ListTransactionsComponent,
      ],
      providers: [
        {
          provide: TransactionsFacade,
          useValue: mockedTransactionsFacade,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ListTransactionsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('onDestroy', (): void => {
    it('should emit unsubscribe$', (done: DoneFn): void => {
      // tslint:disable-next-line: no-string-literal
      component['unsubscribe$'].subscribe((subscriptionValue: undefined): void => {
        expect(subscriptionValue).toBeUndefined();

        done();
      });

      fixture.destroy();
    });
  });

  describe('sort', (): void => {
    it('should sort dates', (): void => {
      component.sort(SortableColumns.Date);

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION2, MOCKED_TRANSACTION3, MOCKED_TRANSACTION]);
    });

    it('should sort beneficiaries', (): void => {
      component.sort(SortableColumns.Beneficiaries);

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION3, MOCKED_TRANSACTION2]);
    });

    it('should sort amount', (): void => {
      component.sort(SortableColumns.Amount);

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION3, MOCKED_TRANSACTION2, MOCKED_TRANSACTION]);
    });

    describe('sort same column 2 times', (): void => {
      it('sort date 2 times', (): void => {
        component.sort(SortableColumns.Date);
        component.sort(SortableColumns.Date);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION3, MOCKED_TRANSACTION2]);
      });

      it('sort beneficiaries 2 times', (): void => {
        component.sort(SortableColumns.Beneficiaries);
        component.sort(SortableColumns.Beneficiaries);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION2, MOCKED_TRANSACTION3, MOCKED_TRANSACTION]);
      });

      it('sort amount 2 times', (): void => {
        component.sort(SortableColumns.Amount);
        component.sort(SortableColumns.Amount);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]);
      });
    });

    describe('sort same column 3 times', (): void => {
      it('sort date 3 times', (): void => {
        component.sort(SortableColumns.Date);
        component.sort(SortableColumns.Date);
        component.sort(SortableColumns.Date);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]);
      });

      it('sort beneficiaries 3 times', (): void => {
        component.sort(SortableColumns.Beneficiaries);
        component.sort(SortableColumns.Beneficiaries);
        component.sort(SortableColumns.Beneficiaries);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]);
      });

      it('sort amount 3 times', (): void => {
        component.sort(SortableColumns.Amount);
        component.sort(SortableColumns.Amount);
        component.sort(SortableColumns.Amount);

        expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION, MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]);
      });
    });
  });

  describe('search', (): void => {
    it('should search based on value', (): void => {
      component.searchBeneficiaries('te');

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION2, MOCKED_TRANSACTION3]);
    });
  });

  describe('sort then search', (): void => {
    it('should sort then search', (): void => {
      component.sort(SortableColumns.Date);
      component.searchBeneficiaries('te');

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION3, MOCKED_TRANSACTION2]);
    });
  });

  describe('search then sort', (): void => {
    it('should search then sort', (): void => {
      component.searchBeneficiaries('te');
      component.sort(SortableColumns.Date);

      expect(component.currentTransactions).toEqual([MOCKED_TRANSACTION3, MOCKED_TRANSACTION2]);
    });
  });
});
