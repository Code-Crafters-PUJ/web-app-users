import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';

@Component({
  selector: 'app-accounts-management-page',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './accounts-management-page.component.html',
  styleUrl: './accounts-management-page.component.css'
})
export class AccountsManagementPageComponent {

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;


  constructor(
    private route: ActivatedRoute,
    private router: Router,

) {}

  ngOnInit(): void {
    this.updateData();
  }
  updateData() {

  }

  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.currentPage, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateURL();
      this.updateData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateURL();
      this.updateData();
    }
  }
}
