import { Component, OnInit } from '@angular/core';
import { BossService } from '../boss.service';
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
  bosses: any[] = [];

  constructor(private bossService: BossService) { }

  ngOnInit(): void {
    this.bossService.getBosses().subscribe(response => {
      this.bosses = response.data;
    });
  }
}
