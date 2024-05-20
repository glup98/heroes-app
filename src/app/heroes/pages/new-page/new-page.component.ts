import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from './../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/dialogs/comfirn-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    {
      id: Publisher.DCComics as string,
      desc: 'DC - Comics',
    },
    {
      id: Publisher.MarvelComics as string,
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    //Material
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/']);
        return this.heroForm.reset(hero);
      });
  }

  public onSubmit() {
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.heroesService.update(this.currentHero).subscribe((hero) => {
        this.showSnackBar(`Heroe ${hero.superhero} actualizado!`);
      });
      return;
    }

    this.heroesService.add(this.currentHero).subscribe((hero) => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackBar(`Heroe ${hero.superhero} creado!`);
    });
  }

  public showSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok!', {
      duration: 2500,
    });
  }

  public onDelete(): void {
    if (!this.currentHero.id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.heroesService.deleteById(this.currentHero.id)),
        filter((wasDeleted) => wasDeleted)
      )
      .subscribe((_wasDeleted) => {
        this.router.navigate(['/heroes']);
        this.showSnackBar(`Heroe ${this.currentHero.superhero} eliminado!`);
      });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) return;

    //   this.heroesService
    //     .deleteById(this.currentHero.id)
    //     .subscribe((wasDeleted) => {
    //       if (wasDeleted) {
    //         this.router.navigate(['/heroes']);
    //         this.showSnackBar(`Heroe ${this.currentHero.superhero} eliminado!`);
    //       }
    //     });
    // });
  }
}
