import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-add',
  templateUrl: './pokemon-add.component.html',
  styleUrls: ['./pokemon-add.component.scss']
})
export class PokemonAddComponent implements OnInit {

  pokemon: Pokemon;

  constructor() { }

  ngOnInit() {
    this.pokemon = new Pokemon();
  }

}
