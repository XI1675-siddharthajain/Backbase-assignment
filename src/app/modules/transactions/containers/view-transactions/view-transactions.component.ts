import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bb-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTransactionsComponent {
}
