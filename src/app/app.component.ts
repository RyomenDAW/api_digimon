import { Component, OnInit } from '@angular/core';
import { DigimonService } from './digimon.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ RouterOutlet] 
})
export class AppComponent {}