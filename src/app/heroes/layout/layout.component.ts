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
export class LayoutComponent {}
