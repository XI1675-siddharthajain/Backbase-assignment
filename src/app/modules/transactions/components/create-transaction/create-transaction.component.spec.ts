import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FormFields } from '@Consts/form-fields.enum';
import { MOCKED_TRANSACTIONS_STATE } from '@Mocks/transactions.mock';
import { TranslateTestingModule } from '@Mocks/translate.mock.spec';
import { Spied } from '@Specs/types/utils.type';

import { TransactionsFacade } from '../../store/transactions.facade';
import { CreateTransactionComponent } from './create-transaction.component';

describe('CreateTransactionComponent', (): void => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let mockedTransactionsFacade: Spied<TransactionsFacade>;

  beforeEach(async(): Promise<void> => {
    mockedTransactionsFacade = {
      ...jasmine.createSpyObj('TransactionsFacade', ['createTransaction']),
      userBalance$: of(MOCKED_TRANSACTIONS_STATE.userBalance),
    };

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
      ],
      declarations: [
        CreateTransactionComponent,
      ],
      providers: [
        FormBuilder,
        {
          provide: TransactionsFacade,
          useValue: mockedTransactionsFacade,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(CreateTransactionComponent);
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

  describe('formValueChangeSubscription', (): void => {
    it('should change the value of isSubmitDisabled to true', (): void => {
      component.createTransactionForm.get(FormFields.To).setValue('test');
      // tslint:disable-next-line: no-magic-numbers
      component.createTransactionForm.get(FormFields.Amount).setValue(555555);

      expect(component.isSubmitDisabled).toBeTrue();
    });

    it('should change the value of isSubmitDisabled to false', (): void => {
      component.createTransactionForm.get(FormFields.To).setValue('test');
      component.createTransactionForm.get(FormFields.Amount).setValue(1);

      expect(component.isSubmitDisabled).toBeFalse();
    });
  });

  describe('createTransaction', (): void => {
    it('should call TransactionsFacade.createTransaction', (): void => {
      fixture.componentInstance.createTransaction();

      expect(mockedTransactionsFacade.createTransaction).toHaveBeenCalledTimes(1);
    });
  });
});
