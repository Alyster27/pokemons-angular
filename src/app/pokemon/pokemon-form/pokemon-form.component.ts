import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // pokemonTypeList
    this.types = this._pokemonService.getPokemonTypeList();
    this.isAddForm = this._router.url.includes('add');
  }

  hasType(type: string) {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon.types.push(type)
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.isAddForm) {
      this._pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon) => this._router.navigate(['/pokemon', pokemon.id]));
    } else {
      this._pokemonService.updatePokemon(this.pokemon).subscribe(() => this._router.navigate(['/pokemon', this.pokemon.id]));
    }
  }
}
