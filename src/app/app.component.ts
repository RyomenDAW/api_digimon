import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],  // Asegúrate de incluirlo aquí],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'angApp_v19';
}
