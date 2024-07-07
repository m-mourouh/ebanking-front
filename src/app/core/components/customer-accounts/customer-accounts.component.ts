import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/account/accounts.service';
import { AccountDetails } from '../../shared/models/account/account.model';
import { Customer } from '../../shared/models/customer/customer.model';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  customerAccounts!: AccountDetails[];
  messageError!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras
      .state as Customer;
  }
  /*ngOnInit() {
    this.customerId=this.activatedRoute.snapshot.params['id'];
    this.accountsService.getCustomerAccounts(this.customerId).subscribe({
      next:data=>{
        this.customerAccounts=data;
        console.log(data);
      },
      error:err=>{
        this.messageError=err.message;
      }
    })
  }*/
  ngOnInit() {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.accountsService.getCustomerAccounts(this.customerId).subscribe({
      next: (data: any) => {
        this.customerAccounts = Object.values(data); // Convert object to array
        console.log(this.customerAccounts);
      },
      error: (err: any) => {
        this.messageError = err.message;
      },
    });
  }

  handleCustomerAccounts(account: AccountDetails) {
    this.router.navigateByUrl('/admin/account-operations/' + account.id, {
      state: account,
    });
  }
}
