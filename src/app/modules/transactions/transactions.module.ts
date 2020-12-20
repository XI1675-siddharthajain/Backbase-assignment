import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ViewRoutes } from '@Consts/routes.const';
import { SharedModule } from '@SharedModule';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { ListTransactionsResolver } from './components/list-transactions/list-transactions.resolver';
import { TransactionsRepository } from './shared/transactions.repository';
import { TransactionsEffects } from './store/transactions.effects';
import { TransactionsFacade } from './store/transactions.facade';
import { transactionsReducer } from './store/transactions.reducers';
import { routedComponents, TransactionsRoutingModule } from './transactions-routing.module';

const modules: ModulesType = [
  SharedModule,
  RouterModule,
  ReactiveFormsModule,
  TransactionsRoutingModule,
  EffectsModule.forFeature([TransactionsEffects]),
  StoreModule.forFeature(ViewRoutes.Transactions, transactionsReducer),
];

const components: ComponentsType = [
  ...routedComponents,
  ListTransactionsComponent,
  CreateTransactionComponent,
];

const providers: Provider[] = [
  TransactionsRepository,
  TransactionsFacade,
  ListTransactionsResolver,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  providers: [ ...providers ],
})
export class TransactionsModule {
}
