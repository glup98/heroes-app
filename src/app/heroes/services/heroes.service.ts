import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((_error) => of(undefined)));
  }

  public getSuggestions(query: string, limit: number = 6): Observable<Hero[]> {
    return this.http.get<Hero[]>(
      `${this.baseUrl}/heroes?q=${query}&limit=${limit}`
    );
  }

  public add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  public update(hero: Partial<Hero>): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map((_resp) => true),
      catchError((_error) => of(false))
    );
  }
}
