import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { PokemonEditComponent } from './pokemon-edit/pokemon-edit.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonAddComponent } from './pokemon-add/pokemon-add.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';

const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: PokemonEditComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/add', component: PokemonAddComponent, canActivate: [AuthGuard] },
  { path: 'pokemons', component: PokemonListComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: PokemonDetailComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonEditComponent,
    PokemonFormComponent,
    PokemonAddComponent,
    PokemonSearchComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
