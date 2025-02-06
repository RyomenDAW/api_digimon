import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  // Cambia la URL base de la API para usar el proxy
  private apiUrl = '/api/api/v1/digimon';  // 🔥 CAMBIO AQUÍ

  constructor(private http: HttpClient) { }

  // Obtiene todos los Digimon
  getDigimons(): Observable<any> {
    return this.http.get(this.apiUrl);  // Esto ahora pasa por el proxy
  }

  // Obtiene un Digimon específico por su nombre
  getDigimonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);  // También usa el proxy
  }
}
