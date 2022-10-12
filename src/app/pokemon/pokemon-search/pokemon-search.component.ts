import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  // exemple term : {..."a"..."ab"..."abc".....}
  searchTerms = new Subject<string>();
  // exemple listening proposition : {...pokemonList(a)...pokemonList(ab)...pokemonList(abc).....}
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private _router: Router,
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // exemple temps d'attente avant de proposer liste pokemons : {..."a"..."ab"..."abc".....}
      debounceTime(300),
      // {....."ab"....."ab"....."abc".....}
      distinctUntilChanged(),
      // {....."ab"....."abc".....}
      switchMap((term) => this._pokemonService.searchPokemonList(term))
      // {.....pokemonList(ab).....pokemonList(abc).....}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this._router.navigate(link)
  }

}
