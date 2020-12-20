import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormFields } from '@Consts/form-fields.enum';

import { TransactionsFacade } from '../../store/transactions.facade';

@Component({
  selector: 'bb-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionComponent implements OnInit, OnDestroy {
  public createTransactionForm: FormGroup;
  public isSubmitDisabled: boolean = true;
  public userBalance: number = 0;

  public readonly formFields: typeof FormFields = FormFields;

  private readonly maxAmount: number = 500;
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsFacade: TransactionsFacade,
  ) {
  }

  public ngOnInit(): void {
    this.createTransactionForm = this.createForm();
    this.userBalanceSubscription();
    this.formValueChangeSubscription();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public createTransaction(): void {
    const to: string = this.createTransactionForm.get(FormFields.To).value;
    const amount: number = this.createTransactionForm.get(FormFields.Amount).value;

    this.createTransactionForm.reset();

    this.transactionsFacade.createTransaction({
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'CRDT',
      },
      merchant: {
        name: to,
        accountNumber: '',
      },
    });
  }

  private formValueChangeSubscription(): void {
    this.createTransactionForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((): void => {
        this.isSubmitDisabled = this.createTransactionForm.invalid
          || this.userBalance - this.createTransactionForm.get(FormFields.Amount).value < -this.maxAmount;
      });
  }

  private userBalanceSubscription(): void {
    this.transactionsFacade.userBalance$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((userBalance: number): void => {
        this.userBalance = userBalance;

        this.createTransactionForm.get(FormFields.From).patchValue(`Free Checking(4692) - $${this.userBalance}`);
        this.createTransactionForm.get(FormFields.Amount).setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.userBalance + this.maxAmount),
        ]);
      });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      [FormFields.From]: [ { value: '', disabled: true }, [ Validators.required ] ],
      [FormFields.To]: [ '', [ Validators.required ] ],
      [FormFields.Amount]: [ null, [ Validators.required, Validators.min(1), Validators.max(this.userBalance + this.maxAmount) ] ],
    });
  }
}
