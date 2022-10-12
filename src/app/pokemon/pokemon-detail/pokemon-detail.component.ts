import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon | null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string | null = this._route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this._pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this._pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this._router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this._router.navigate(['/edit/pokemon', pokemon.id]);
  }

}
