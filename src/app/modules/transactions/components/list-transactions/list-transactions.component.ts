import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SortDirection } from '@Consts/sort-direction.enum';
import { SortableColumns } from '@Consts/sortable-columns.enum';

import { Transaction } from '../../shared/transactions.interface';
import { TransactionsFacade } from '../../store/transactions.facade';

@Component({
  selector: 'bb-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTransactionsComponent implements OnInit, OnDestroy {
  public arrowClass: string = '';
  public currentTransactions: Transaction[] = [];
  public sortDirection: SortDirection = SortDirection.Ascending;
  public sortedColumn: SortableColumns;

  public readonly sortDirections: typeof SortDirection = SortDirection;
  public readonly sortableColumns: typeof SortableColumns = SortableColumns;

  private searchValue: string;
  private defaultTransactions: Transaction[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public constructor(
    public readonly transactionsFacade: TransactionsFacade,
    public readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.transactionsFacade.transactionsList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((transactions: Transaction[]): void => {
        this.currentTransactions = [...transactions];
        this.defaultTransactions = [...transactions];

        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public sort(sortedColumn: SortableColumns): void {
    const defaultTransactions: Transaction[] = [...this.defaultTransactions];

    this.currentTransactions = this.searchValue
      ? defaultTransactions.filter((transaction: Transaction): boolean => (
        transaction.merchant.name.toLowerCase().includes(this.searchValue)
      ))
      : defaultTransactions;

    if (this.sortedColumn === sortedColumn) {
      this.switchSortDirection();
    }

    this.sortedColumn = sortedColumn;

    this.sortColumn([...this.currentTransactions]);
  }

  public searchBeneficiaries(value: string): void {
    this.searchValue = value.toLowerCase();

    this.sort(this.sortedColumn);
  }

  private sortColumn(defaultTransactions: Transaction[]): void {
    if (this.sortDirection !== SortDirection.None) {
      this.currentTransactions = this.currentTransactions
        .sort((currentValue: Transaction, nextValue: Transaction): number => {
          if (this.sortDirection === SortDirection.Ascending) {
            return this.sortColumnAsc(currentValue, nextValue);
          }

          return -this.sortColumnAsc(currentValue, nextValue);
        });
    } else {
      this.sortedColumn = SortableColumns.None;
      this.sortDirection = SortDirection.Ascending;
      this.currentTransactions = defaultTransactions;
    }
  }

  private switchSortDirection(): void {
    const arrowClasses: string[] = ['down', 'up', ''];
    const sortDirections: SortDirection[] = [SortDirection.Ascending, SortDirection.Descending, SortDirection.None];
    const currentDirectionIndex: number = sortDirections.findIndex((element: SortDirection): boolean => element === this.sortDirection);

    this.arrowClass = arrowClasses[(currentDirectionIndex + 1) % sortDirections.length];
    this.sortDirection = sortDirections[(currentDirectionIndex + 1) % sortDirections.length];
  }

  private sortColumnAsc(currentValue: Transaction, nextValue: Transaction): number {
    // tslint:disable-next-line: switch-default
    switch (this.sortedColumn) {
      case SortableColumns.Date:
        return ListTransactionsComponent.sortDateAsc(currentValue, nextValue);
      case SortableColumns.Beneficiaries:
        return ListTransactionsComponent.sortBeneficiariesAsc(currentValue, nextValue);
      case SortableColumns.Amount:
        return ListTransactionsComponent.sortAmountAsc(currentValue, nextValue);
    }
  }

  private static sortDateAsc(currentValue: Transaction, nextValue: Transaction): number {
    return moment(currentValue.dates.valueDate).unix() - moment(nextValue.dates.valueDate).unix();
  }

  private static sortBeneficiariesAsc(currentValue: Transaction, nextValue: Transaction): number {
    return currentValue.merchant.name.toLowerCase().localeCompare(nextValue.merchant.name.toLowerCase());
  }

  private static sortAmountAsc(currentValue: Transaction, nextValue: Transaction): number {
    return Number(currentValue.transaction.amountCurrency.amount) - Number(nextValue.transaction.amountCurrency.amount);
  }
}
