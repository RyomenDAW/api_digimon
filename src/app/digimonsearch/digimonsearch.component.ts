// ==========================================================
// ✅ IMPORTACIONES NECESARIAS
// ==========================================================
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// ==========================================================
// ✅ URL BASE DE LA API DE DIGIMON
// ==========================================================
const BASE_URL = "https://digi-api.com/api/v1/digimon";

// ==========================================================
// ✅ INTERFAZ PARA TIPAR LOS DIGIMONS CORRECTAMENTE
// ==========================================================
interface Digimon {
  id: number;
  name: string;
  image: string;
  level: string;
  type: string;
  attribute: string;
  releaseDate: string;
  skills: string[];
}

// ==========================================================
// ✅ COMPONENTE PRINCIPAL
// ==========================================================
@Component({
  selector: 'app-digimonsearch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digimonsearch.component.html',
  styleUrls: ['./digimonsearch.component.css']
})
export class DigimonsearchComponent {
  
  // ==========================================================
  // ✅ LISTA DE DIGIMONS PARA MOSTRAR EN CARTAS
  // ==========================================================
  allDigimons: Digimon[] = []; // 🔹 ALMACENA TODOS LOS DIGIMONS CARGADOS
  filteredDigimons: Digimon[] = []; // 🔹 FILTRA SEGÚN EL BUSCADOR

  @Output() digimonSelected = new EventEmitter<Digimon>(); // 🔹 EVENTO PARA PASAR EL DIGIMON SELECCIONADO

  isAscending: boolean = true; // 🔄 Estado para ordenar (A-Z o Z-A)

  // ==========================================================
  // ✅ CONSTRUCTOR: INYECTAMOS HTTP CLIENT Y CARGAMOS DIGIMONS
  // ==========================================================
  constructor(private http: HttpClient) {
    this.loadRandomDigimons(); // 🔹 CARGA INICIAL DE DIGIMONS
  }

  // ==========================================================
  // ✅ CARGAR 1461 DIGIMONS CON DETALLES
  // ==========================================================
  loadRandomDigimons() {
    this.allDigimons = []; // 🔄 LIMPIAMOS ANTES DE CARGAR
    console.log("🔥 Iniciando carga de 1461 Digimon...");

    this.http.get<any>(`${BASE_URL}?pageSize=1461`).subscribe(response => {
      if (!response || !response.content || !Array.isArray(response.content)) {
        console.error("❌ Error: Respuesta de la API no válida");
        return;
      }

      console.log("🔹 Lista básica de 1461 Digimon recibida:", response.content);

      let pendingRequests = response.content.length; // Contador de peticiones pendientes

      response.content.forEach((basicDigimon: any) => {
        this.http.get<any>(`${BASE_URL}/${basicDigimon.name}`).subscribe(fullResponse => {
          // ✅ Guardamos el Digimon con todos sus atributos
          this.allDigimons.push({
            id: fullResponse.id ?? Math.random(),
            name: fullResponse.name ?? 'Desconocido',
            image: fullResponse.images?.[0]?.href || 'https://via.placeholder.com/100',
            level: fullResponse.levels?.[0]?.level || 'Desconocido',
            type: fullResponse.types?.[0]?.type || 'Desconocido',
            attribute: fullResponse.attributes?.[0]?.attribute || 'Desconocido',
            releaseDate: fullResponse.releaseDate || 'Desconocido',
            skills: fullResponse.skills?.slice(0, 3).map((skill: any) => skill.skill) || ['No disponibles']
          });

          pendingRequests--;
          if (pendingRequests === 0) {
            console.log("✅ TODOS los Digimon han sido cargados correctamente");
            this.filteredDigimons = [...this.allDigimons].sort(() => 0.5 - Math.random()).slice(0, 30);
          }
        }, error => {
          console.error(`❌ Error obteniendo detalles de ${basicDigimon.name}:`, error);
        });
      });
    }, error => {
      console.error("❌ Error obteniendo la lista de todos los Digimon:", error);
    });
  }

  // ==========================================================
  // ✅ FILTRAR DIGIMONS SEGÚN EL INPUT DEL BUSCADOR
  // ==========================================================
  filterDigimons(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();
    
    if (searchTerm === '') {
      this.filteredDigimons = [...this.allDigimons]; // 🔹 REESTABLECER SI NO HAY BÚSQUEDA
    } else {
      this.filteredDigimons = this.allDigimons.filter((d: Digimon) => 
        d.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  // ==========================================================
  // ✅ BUSCAR UN DIGIMON POR NOMBRE
  // ==========================================================
  getDigimon(digimonNameInput: HTMLInputElement) {
    let name = digimonNameInput.value.trim().toLowerCase();
    if (!name) return; // Evitamos búsquedas vacías

    this.http.get<any>(`${BASE_URL}`).subscribe(response => {
      if (!response || !response.content || !Array.isArray(response.content)) {
        console.error("❌ Error: Respuesta de la API no válida");
        return;
      }

      this.filteredDigimons = response.content
        .filter((digimon: any) => digimon.name.toLowerCase().includes(name))
        .map((digimon: any): Digimon => ({
          id: digimon.id || Math.random(),
          name: digimon.name || 'Desconocido',
          image: digimon.images?.[0]?.href ?? 'https://via.placeholder.com/100',
          level: digimon.levels?.[0]?.level || 'Desconocido',
          type: digimon.types?.[0]?.type || 'Desconocido',
          attribute: digimon.attributes?.[0]?.attribute || 'Desconocido',
          releaseDate: digimon.releaseDate || 'Desconocido',
          skills: digimon.skills?.slice(0, 3).map((skill: any) => skill.skill) || ['No disponibles']
        }));

      if (this.filteredDigimons.length === 0) {
        console.warn(`⚠️ No se encontraron Digimons con "${name}"`);
        this.resetFields();
      }
    }, error => {
      console.error(`❌ Error buscando Digimons con "${name}":`, error);
      this.resetFields();
    });
  }

  // ==========================================================
  // ✅ RESETEAR CAMPOS SI NO HAY RESULTADOS
  // ==========================================================
  resetFields() {
    this.filteredDigimons = [];
  }

  // ==========================================================
  // ✅ TOGGLE PARA ORDENAR A-Z / Z-A
  // ==========================================================
  toggleSort() {
    this.isAscending = !this.isAscending; // 🔄 Alternamos entre A-Z y Z-A

    this.filteredDigimons.sort((a, b) => {
      return this.isAscending 
        ? a.name.localeCompare(b.name) // 🆙 A-Z
        : b.name.localeCompare(a.name); // 🔽 Z-A
    });
  }

    // ==========================================================
  // ✅ AGREGAR O QUITAR DE FAVORITOS
  // ==========================================================
  addToFavorites(digimon: Digimon) {
    let favoritos: Digimon[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

    const index = favoritos.findIndex(d => d.id === digimon.id);
    if (index === -1) {
      favoritos.push(digimon); 
    } else {
      favoritos.splice(index, 1); 
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
  }

  // ✅ VERIFICAR SI UN DIGIMON ESTÁ EN FAVORITOS
  isFavorite(digimon: Digimon): boolean {
    let favoritos: Digimon[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    return favoritos.some(d => d.id === digimon.id);
  }
}
