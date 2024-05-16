import { Component } from '@angular/core';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HeroPageComponent {}
