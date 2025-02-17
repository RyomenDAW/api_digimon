import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Para enviar datos

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor, HttpClientModule] // Se añade HttpClientModule
})
export class ContactoComponent {
  contactForm!: FormGroup;
  isLoading: boolean = false;
  formSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  private createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/)
      ]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    debugger;
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isLoading = true;
    const formData = this.contactForm.value;

    // URL de destino (cambiamos esto por el enlace de formspree)
    this.http.post('https://formspree.io/f/xvgzvadl', formData).subscribe({
      next: () => {
        this.formSubmitted = true;
        this.isLoading = false;
        this.contactForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Error al enviar el formulario. Inténtalo de nuevo más tarde.';
        console.error('Error:', err);
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
