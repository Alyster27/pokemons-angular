import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.auth = this._authService;
  }

  // Informe l'utilisateur sur son authentfication.
  setMessage() {
    this.message = this._authService.isLoggedIn ?
      'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = 'Tentative de connexion en cours ...';
    this._authService.login(this.name, this.password).subscribe((isLoggedIn: boolean) => {
      this.setMessage();
      if (this._authService.isLoggedIn) {
        // Récupère l'URL de redirection depuis le service d'authentification
        // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
        let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/pokemons';
        // Redirige l'utilisateur
        this._router.navigate([redirect]);
      } else {
        this.password = '';
      }
    });
  }

  // Déconnecte l'utilisateur
  logout() {
    this._authService.logout();
    this.setMessage();
  }
}