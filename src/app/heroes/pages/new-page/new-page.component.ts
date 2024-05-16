import { Component } from '@angular/core';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NewPageComponent {}
