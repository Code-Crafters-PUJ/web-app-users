import { Component, OnInit } from '@angular/core';
import { BillService } from '../../../services/sales-services/bill.service';
import { SucursalService } from '../../../services/sales-services/sucursal.service';
import { branch } from '../../../models/Inventory/branch';
import { bill } from '../../../models/sales-models/bill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-all-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-all-bills.component.html',
  styleUrl: './show-all-bills.component.css'
})
export class ShowAllBillsComponent implements OnInit {
  branches: any[] = [];
  bills: any[] = [];
  paginatedBranches: any[] = [];
  paginatedBills: any[] = [];
  currentBranchPageIndex: number = 0;
  currentBillPageIndex: number[] = [];

  constructor(private sucursalService: SucursalService, private facturaService: BillService) { }

  ngOnInit(): void {
    this.loadBranches();
    this.loadBills();
  }

  loadBranches() {
    this.sucursalService.getAll().subscribe((data: any) => {
      this.branches = data;
      for (let index = 0; index < this.branches.length; index++) {
        this.currentBillPageIndex.push(0)
      }
      this.paginateBranches();
    });
  }

  loadBills() {
    this.facturaService.getAll().subscribe((data: any) => {
      this.bills = data;
      this.paginateBills();
    });
  }

  paginateBranches() {
    const pageSize = 2; // Número máximo de sucursales por página
    this.paginatedBranches = [];
    for (let i = 0; i < this.branches.length; i += pageSize) {
      if (i + pageSize < this.branches.length) {
        const page = this.branches.slice(i, i + pageSize);
        this.paginatedBranches.push(page);
      }
      else {
        const page = this.branches.slice(i,this.branches.length);
        this.paginatedBranches.push(page);
      }
    }
    console.log(this.paginatedBranches[0][1])
  }

  paginateBills() {
    const pageSize = 5; // Número máximo de facturas por página
    this.paginatedBills = [];
    this.paginatedBranches[this.currentBranchPageIndex].forEach((branch: { id: any; }) => {
      const branchBills = this.bills.filter(bill => bill.branch_id === branch.id);
      const paginatedBranchBills = [];
      for (let i = 0; i < branchBills.length; i += pageSize) {
        const billPage = branchBills.slice(i, i + pageSize);
        paginatedBranchBills.push(billPage);
      }
      this.paginatedBills.push(paginatedBranchBills);
    });
    console.log(this.paginatedBills)
  }

  nextBranchPage() {
    if (this.currentBranchPageIndex < this.paginatedBranches.length - 1) {
      this.currentBranchPageIndex++;
    }
  }

  prevBranchPage() {
    if (this.currentBranchPageIndex > 0) {
      this.currentBranchPageIndex--;
    }
  }

  nextBillPage(i: number) {
    if (this.currentBillPageIndex[i] < this.paginatedBills[this.currentBranchPageIndex].length - 1) {
      this.currentBillPageIndex[i]++;
    }
  }

  prevBillPage(i: number) {
    if (this.currentBillPageIndex[i] > 0) {
      this.currentBillPageIndex[i]--;
    }
  }
}