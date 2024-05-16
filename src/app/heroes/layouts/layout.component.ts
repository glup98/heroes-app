import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout',
  templateUrl: './layout.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LayoutComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];
}
