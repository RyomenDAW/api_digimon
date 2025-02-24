import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //  IMPORTAMOS CommonModule
import { FormsModule } from '@angular/forms'; //IMPORTAMOS FormsModule PARA ngModel
import { AuthService } from '../../services/auth.service'; // 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; //  DEBE ESTAR DEFINIDO PARA EVITAR ERRORES
  password: string = '';
  user: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  //  REGISTRAR USUARIO
  async register() {
    try {
      this.user = await this.authService.register(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // INICIAR SESIÓN
  async login() {
    try {
      this.user = await this.authService.login(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  //  CERRAR SESIÓN
  async logout() {
    try {
      await this.authService.logout();
      this.user = null;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // OBTENER INFORMACIÓN DEL USUARIO ACTUAL
  async getUser() {
    try {
      const userData = await this.authService.getCurrentUser();
      if (userData) {
        this.user = userData;
        console.log("🔹 Usuario en sesión:", this.user);
      } else {
        this.user = null;
        console.warn("⚠️ No hay usuario en sesión");
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

}
  

