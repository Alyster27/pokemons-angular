import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.scss']
})
export class PokemonEditComponent implements OnInit {

  pokemon: Pokemon | null;

  constructor(
    private _route: ActivatedRoute,
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string | null = this._route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this._pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon);
    } else {
      this.pokemon = null;
    }
  }

}
