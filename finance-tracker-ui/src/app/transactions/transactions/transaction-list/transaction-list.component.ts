import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['description', 'amount', 'category', 'date', 'actions'];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe(data => {
      this.transactions = data;
    });
  }

  deleteTransaction(id: number) {
    this.transactionService.delete(id).subscribe(() => {
      this.loadTransactions();
    });
  }
}
