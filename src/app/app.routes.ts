import { Routes } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/authentication-page/login-page/login-page.component';
import { PasswordPageComponent } from './pages/authentication-page/password-page/password-page.component';
import { SignupIPageComponent } from './pages/authentication-page/signup-i-page/signup-i-page.component';
import { SignupIIPageComponent } from './pages/authentication-page/signup-ii-page/signup-ii-page.component';

import { AdminPageComponent } from './pages/analytics-page/admin-page/admin-page.component';
import { GeneralInfoPageComponent } from './pages/account-page/general-info-page/general-info-page.component';
import { ConfigInfoPageComponent } from './pages/account-page/config-info-page/config-info-page.component';
import { ConfigPaymentPageComponent } from './pages/account-page/config-payment-page/config-payment-page.component';
import { AccountsManagementPageComponent } from './pages/account-page/accounts-management-page/accounts-management-page.component';

import { PayrollPageComponent } from './pages/analytics-page/payroll-page/payroll-page.component';
import { ShowPayrollsPageComponent } from './pages/payroll-page/show-payrolls-page/show-payrolls-page.component';
import { ShowDetailsPayrollPageComponent } from './pages/payroll-page/show-details-payroll-page/show-details-payroll-page.component';
import { NewPayrollPageComponent } from './pages/payroll-page/new-payroll-page/new-payroll-page.component';
import { ShowEmployeesPageComponent } from './pages/payroll-page/show-employees-page/show-employees-page.component';
import { ShowDetailsEmployeePageComponent } from './pages/payroll-page/show-details-employee-page/show-details-employee-page.component';
import { NewEmployeePageComponent } from './pages/payroll-page/new-employee-page/new-employee-page.component';

import { SalesPageComponent } from './pages/analytics-page/sales-page/sales-page.component';
import { ShowAllBillsComponent } from './pages/sales-page/show-all-bills-page/show-all-bills.component';
import { CreateBillComponent } from './pages/sales-page/create-bill-page/create-bill.component';

import { InventoryPageComponent } from './pages/analytics-page/inventory-page/inventory-page.component';
import { ShowAllProductsComponent } from './pages/inventory-page/show-all-products-page/show-all-products.component';
import { ShowProductDetailsComponent } from './pages/inventory-page/show-product-details-page/show-product-details.component';
import { CreateProductComponent } from './pages/inventory-page/create-product-page/create-product.component';
import { CreateSupplierComponent } from './pages/inventory-page/create-supplier-page/create-supplier.component';
import { ShowSupplierDetailsComponent } from './pages/inventory-page/show-supplier-details-page/show-supplier-details.component';

import { AccountingPageComponent } from './pages/analytics-page/accounting-page/accounting-page.component';
import { AccountingRecordComponent } from './pages/accounting-page/accounting-record-page/accounting-record.component';
import { ElectronicPayrollComponent } from './pages/accounting-page/electronic-payroll-page/electronic-payroll.component';
import { ElectronicBillComponent } from './pages/accounting-page/electronic-bill-page/electronic-bill.component';
import {PayrollComponent} from "./pages/payroll-page/payroll.component";

export const routes: Routes = [

    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: SignupIPageComponent },
    { path: 'payment', component:SignupIIPageComponent },
    { path:'lostpassword', component: PasswordPageComponent },

    {
        path: 'home/admin',
        children: [
            { path: 'general', component:AdminPageComponent },
            { path: 'myaccount', component:GeneralInfoPageComponent },
            { path: 'configinfo', component:ConfigInfoPageComponent },
            { path: 'configpayment', component:ConfigPaymentPageComponent },
            { path: 'accmanagement', component:AccountsManagementPageComponent },
            { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
    },

    {
        path: "home/payroll",
        children: [
            { path: 'general', component: PayrollPageComponent },
            { path: 'show/all/payrolls', component:ShowPayrollsPageComponent },
          { path: 'show/detail/payroll/:id', component: ShowDetailsPayrollPageComponent },
            { path: 'register/payroll', component: NewPayrollPageComponent },
            { path: 'show/all/employees', component: ShowEmployeesPageComponent },
            {path: 'show/detail/employee/:id', component:ShowDetailsEmployeePageComponent },
            {path: 'register/employee', component:NewEmployeePageComponent },
            { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
    },

    {
        path: "home/sales",
        children: [
            { path: 'general', component:SalesPageComponent },
            { path: 'show/all', component:ShowAllBillsComponent },
            { path:'register/bill', component:CreateBillComponent },
            { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
    },

    {
        path: "home/inventory",
        children: [
            { path: 'general', component:InventoryPageComponent },
            { path: 'show/product/all', component: ShowAllProductsComponent },
            { path: 'show/product/detail', component:ShowProductDetailsComponent },
            { path: 'show/supplier/detail', component:ShowSupplierDetailsComponent },
            { path: 'register/product', component: CreateProductComponent },
            { path: 'register/supplier', component: CreateSupplierComponent },
            { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
    },

    {
        path: "home/accounting",
        children: [
            { path: 'general', component:AccountingPageComponent },
            { path: 'records', component:AccountingRecordComponent },
            { path: 'electronic/payroll', component:ElectronicPayrollComponent },
            { path: 'electornic/bill', component:ElectronicBillComponent },
            { path: '', redirectTo: 'general', pathMatch: 'full' }
        ]
    }

];
