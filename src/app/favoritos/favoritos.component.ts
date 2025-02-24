import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  favoritos: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    // Cargar favoritos desde Router State o LocalStorage
    const state = this.router.getCurrentNavigation()?.extras.state as { favoritos: any[] };
    this.favoritos = state?.favoritos || JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  removeFromFavorites(digimon: any) {
    this.favoritos = this.favoritos.filter(d => d.id !== digimon.id);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  showLogin = false;

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}
