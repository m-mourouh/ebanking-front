import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOperationsComponent } from './core/components/account-operations/account-operations.component';
import { AccountsComponent } from './core/components/accounts/accounts.component';
import { AdminTemplateComponent } from './core/components/admin-template/admin-template.component';
import { CustomerAccountsComponent } from './core/components/customer-accounts/customer-accounts.component';
import { CustomersComponent } from './core/components/customers/customers.component';
import { LoginComponent } from './core/components/login/login.component';
import { NewCustomerComponent } from './core/components/new-customer/new-customer.component';
import { NotAuthorizedComponent } from './core/components/not-authorized/not-authorized.component';
import { authentificationGuard } from './core/guards/authentification/authentification.guard';
import { authorizationGuard } from './core/guards/authorization/authorization.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [authentificationGuard],
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'accounts', component: AccountsComponent },
      {
        path: 'new-customer',
        component: NewCustomerComponent,
        canActivate: [authorizationGuard],
        data: { role: 'ADMIN' },
      },
      { path: 'customer-accounts/:id', component: CustomerAccountsComponent },
      { path: 'account-operations/:id', component: AccountOperationsComponent },
      { path: 'notAuthorized', component: NotAuthorizedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
