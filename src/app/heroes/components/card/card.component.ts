import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces';

@Component({
  selector: 'heroes-card',
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Missing hero property');
  }
}
