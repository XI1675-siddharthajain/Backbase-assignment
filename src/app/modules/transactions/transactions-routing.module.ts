import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewRoutes } from '@Consts/routes.const';
import { ComponentsType } from '@Types/module.types';

import { ListTransactionsResolver } from './components/list-transactions/list-transactions.resolver';
import { ViewTransactionsComponent } from './containers/view-transactions/view-transactions.component';

const routes: Routes = [
  {
    path: ViewRoutes.Empty,
    component: ViewTransactionsComponent,
    resolve: [ ListTransactionsResolver ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TransactionsRoutingModule {
}

export const routedComponents: ComponentsType = [
  ViewTransactionsComponent,
];
