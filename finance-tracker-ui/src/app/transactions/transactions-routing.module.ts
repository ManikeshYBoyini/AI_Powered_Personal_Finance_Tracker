import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components used in routing
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';

const routes: Routes = [
  { path: '', component: TransactionListComponent }, 
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/new', component: TransactionFormComponent }, 
  { path: 'transactions/edit/:id', component: TransactionFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
