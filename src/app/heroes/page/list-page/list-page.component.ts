import { Component } from '@angular/core';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ListPageComponent {}