import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../digimon.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Agrega esta importación

@Component({
  selector: 'app-home',
  standalone: true,  // Asegúrate de que el componente es standalone
  imports: [CommonModule, HttpClientModule],  // Agrega HttpClientModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  digimons: any[] = [];

  constructor(private digimonService: DigimonService) { }

  ngOnInit(): void {
    this.digimonService.getDigimons().subscribe(response => {
      this.digimons = response.data;
    });
  }
}
