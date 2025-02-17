import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // IMPORTANTE
const BASE_URL = 'https://digi-api.com/api/v1/digimon'; // URL base de la API

@Component({
  selector: 'app-home',
  standalone: true, // 🚀 IMPORTANTE en Angular 19
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule] // 
})
export class HomeComponent {
  digimonName: string = 'Agumon'; // Nombre por defecto
  digimonImage: string = ''; // URL de la imagen del Digimon
  digimonLevel: string = 'Desconocido';
  digimonType: string = 'Desconocido';
  digimonAttribute: string = 'Desconocido';
  digimonReleaseDate: string = 'Desconocido';
  digimonSkills: string[] = [];
  
  // Digimones originales ahora por nombre
  originalDigimonNames: string[] = ["Skull Greymon", "Garurumon", "Meramon", "War Greymon"];
  featuredDigimons: { name: string; image: string }[] = [];

  constructor(private http: HttpClient) {
    this.loadFeaturedDigimons(this.originalDigimonNames);
  }

  // ✅ CARGAR DIGIMONES DESTACADOS POR NOMBRE (mínimos cambios)
  loadFeaturedDigimons(names: string[]) {
    this.featuredDigimons = []; // Limpiar antes de cargar
    names.forEach(name => {
      this.http.get<any>(`${BASE_URL}/${name}`) // Ahora busca por nombre
        .subscribe(response => {
          this.featuredDigimons.push({
            name: response.name,
            image: response.images?.[0]?.href || ''
          });
        }, error => {
          console.error(`Error obteniendo el Digimon ${name}:`, error);
        });
    });
  }

// ✅ SHUFFLE DIGIMONES - Ahora selecciona Digimon aleatorios desde la API
shuffleDigimons() {
  const randomIds = Array.from({ length: 4 }, () => Math.floor(Math.random() * 300) + 1); // 🔥 Genera 200 IDs aleatorios
  this.featuredDigimons = []; // 🔄 Limpia la lista antes de actualizar

  randomIds.forEach(id => {
    this.http.get<any>(`https://digi-api.com/api/v1/digimon/${id}`)
      .subscribe(response => {
        this.featuredDigimons.push({
          name: response.name,
          image: response.images?.[0]?.href || ''
        });
      }, error => {
        console.error(`Error obteniendo el Digimon con ID ${id}:`, error);
      });
  });
}



  // ✅ RESET DIGIMONES (ahora carga por nombre en vez de ID)
  resetDigimons() {
    this.loadFeaturedDigimons(this.originalDigimonNames);
  }

  // ✅ BUSCAR DIGIMON POR NOMBRE (mínimo cambio)
  getDigimon(digimonNameInput: HTMLInputElement) {
    const name = digimonNameInput.value.trim();
    if (!name) return; // Evitamos búsquedas vacías

    this.http.get<any>(`${BASE_URL}/${name}`) // Busca por nombre
      .subscribe(response => {
        console.log(response); // ✅ Verificamos la respuesta en consola
        // Extraer información básica
        this.digimonName = response.name || 'Desconocido';
        this.digimonImage = response.images?.[0]?.href ?? '';
        this.digimonLevel = response.levels?.[0]?.level || 'Desconocido';
        this.digimonType = response.types?.[0]?.type || 'Desconocido';
        this.digimonAttribute = response.attributes?.[0]?.attribute || 'Desconocido';
        this.digimonReleaseDate = response.releaseDate || 'Desconocido';
        this.digimonSkills = response.skills?.slice(0, 3).map((skill: { skill: string }) => skill.skill) || ['No disponibles'];
      }, error => {
        console.error('Error obteniendo el Digimon:', error);

        // En caso de error, limpiar los valores
        this.digimonName = 'No encontrado';
        this.digimonImage = '';
        this.digimonLevel = 'Desconocido';
        this.digimonType = 'Desconocido';
        this.digimonAttribute = 'Desconocido';
        this.digimonReleaseDate = 'Desconocido';
        this.digimonSkills = ['No disponibles'];
      });
  }
}
