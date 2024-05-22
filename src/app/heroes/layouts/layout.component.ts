import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/user.interfaces';

@Component({
  selector: 'heroes-layout',
  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
