import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private _router: Router,
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this._pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList)
  }

  goToPokemon(pokemon: Pokemon) {
    this._router.navigate(['/pokemon', pokemon.id])
  }

}
