import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  isEditing: boolean = false;
  transactionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.transactionId = +id;
      this.loadTransaction();
    }
  }

  loadTransaction() {
    if (this.transactionId) {
      this.transactionService.getById(this.transactionId).subscribe(transaction => {
        this.transactionForm.patchValue(transaction);
      });
    }
  }

  saveTransaction() {
    if (this.transactionForm.valid) {
      if (this.isEditing && this.transactionId) {
        this.transactionService.update({ ...this.transactionForm.value, id: this.transactionId }).subscribe(() => {
          this.router.navigate(['/transactions']);
        });
      } else {
        this.transactionService.create(this.transactionForm.value).subscribe(() => {
          this.router.navigate(['/transactions']);
        });
      }
    }
  }
}
