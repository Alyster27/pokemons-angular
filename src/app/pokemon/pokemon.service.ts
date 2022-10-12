import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this._http.get<Pokemon[]>(`api/pokemons`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<null> {
    return this._http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }

    return this._http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private log(response: Pokemon[] | Pokemon | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this._http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this._http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this._http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response: any) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Combat',
      'Psy'
    ];
  }
}
