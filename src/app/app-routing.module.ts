import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePathMatchOptions, ViewRoutes } from '@Consts/routes.const';
import { Module } from '@Types/module.types';

const routes: Routes = [
  {
    path: ViewRoutes.Transactions,
    loadChildren: (): Promise<Module> => import('./modules/transactions/transactions.module')
      .then((module: Module): Module => module.TransactionsModule),
  },
 
  {
    path: ViewRoutes.Empty,
    redirectTo: ViewRoutes.Transactions,
    pathMatch: RoutePathMatchOptions.Full,
  },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
