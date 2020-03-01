import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions: any [] = [];

  showTransaction: boolean;

  constructor(private transactionService: TransactionService, private router: Router) {
    this.showTransaction = false;
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe( (resp) => {
      this.transactions = resp;
    });
  }

  searchTransaction(form: NgForm) {
    console.log(form.form.value);
    this.transactionService.findTransactionByFilter(form.form.value).subscribe( (resp) => {
      this.transactions = resp;
    });
  }

  viewTransaction(dato: string) {

    //this.showTransaction = true;
    console.log('dato : ' + dato);

    const id = dato;

    this.router.navigate(['/transaction', id]);
  }
}
