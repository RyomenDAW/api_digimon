import { Component, OnInit } from '@angular/core';
import { DigimonService } from './digimon.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ RouterOutlet, FormsModule] 
})
export class AppComponent {
  showLogin = false;

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}
