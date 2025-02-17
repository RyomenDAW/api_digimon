import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../digimon.service';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'https://digi-api.com'; // URL base de la API

interface Digimon {
  name: string;
  images: { href: string }[]; // Asumiendo que cada Digimon tiene una lista de imágenes
}

@Component({
  selector: 'app-home',
  standalone: true, // 🚀 IMPORTANTE en Angular 19
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [] // Si usas otros componentes, agrégales aquí
})
export class HomeComponent {
  digimonId: number = 1; // ID por defecto
  digimonName: string = 'Agumon'; // Nombre por defecto
  digimonImage: string = ''; // URL de la imagen del Digimon
  digimonLevel: string = 'Desconocido';
  digimonType: string = 'Desconocido';
  digimonAttribute: string = 'Desconocido';
  digimonReleaseDate: string = 'Desconocido';
  digimonSkills: string[] = [];
  originalDigimonIds: number[] = [32, 33, 140, 202]; // Digimon originales
  featuredDigimons: { id: number; name: string; image: string }[] = [];

  constructor(private http: HttpClient) {
    this.loadFeaturedDigimons(this.originalDigimonIds);
  }

  loadFeaturedDigimons(ids: number[]) {
    this.featuredDigimons = []; // Limpiar antes de cargar
    ids.forEach(id => {
      this.http.get<any>(`https://digi-api.com/api/v1/digimon/${id}`)
        .subscribe(response => {
          this.featuredDigimons.push({
            id: id,
            name: response.name,
            image: response.images?.[0]?.href || ''
          });
        });
    });
  }

  shuffleDigimons() {
    const randomIds = Array.from({ length: 4 }, () => Math.floor(Math.random() * 300) + 1);
    this.loadFeaturedDigimons(randomIds);
  }

  resetDigimons() {
    this.loadFeaturedDigimons(this.originalDigimonIds);
  }

  getDigimon(digimonIdInput: HTMLInputElement) {
    const id = Number(digimonIdInput.value);
    if (id <= 0 || isNaN(id)) return; // Evitamos IDs inválidos, is Not a Number es NAN.

    this.digimonId = id; // Actualizamos el número del Digimon en pantalla

    this.http.get<any>(`https://digi-api.com/api/v1/digimon/${id}`)



      .subscribe(response => {
        console.log(response); // ✅ Verificamos la respuesta en consola
        // Extraer información básica
        this.digimonName = response.name || 'Desconocido';
        this.digimonImage = response.images?.[0]?.href ?? '';
        this.digimonLevel = response.levels?.[0]?.level || 'Desconocido';
        this.digimonType = response.types?.[0]?.type || 'Desconocido';
        this.digimonAttribute = response.attributes?.[0]?.attribute || 'Desconocido';
        this.digimonReleaseDate = response.releaseDate || 'Desconocido';

        // Extraer hasta 3 habilidades si existen
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
  }}


 
