import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public suggestedHeroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  public getSuggestedHeroes(): void {
    const query = this.searchInput.value || '';

    if (query.length === 0) {
      this.suggestedHeroes = [];
      return;
    }

    this.heroesService
      .getSuggestions(query.toLowerCase())
      .subscribe((heroes) => {
        return (this.suggestedHeroes = heroes);
      });
  }

  public handleSelectOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
