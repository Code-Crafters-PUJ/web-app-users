import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const offcanvasElement = document.getElementById('offcanvasExample');
    if (offcanvasElement) {
      offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
        document.body.style.overflow = 'auto';
      });
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
