import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CommonModule, NgIf, NgFor } from '@angular/common'; 

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor] // ✅ Asegúrate de incluir ReactiveFormsModule

})
export class ContactoComponent {
  contactForm!: FormGroup;
  isLoading: boolean = false;
  formSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isLoading = true;
    const formData = this.contactForm.value;

    emailjs.send(
      'service_ztvsnfl',  // Reemplaza con tu Service ID de EmailJS
      'template_lodtbn7', // Reemplaza con tu Template ID de EmailJS
      formData,
      'dh1iIIVBBVIZ-TdYJ'   // Reemplaza con tu Public Key de EmailJS
    ).then(
      () => {
        this.formSubmitted = true;
        this.isLoading = false;
        this.contactForm.reset();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al enviar el formulario. Inténtalo más tarde.';
        console.error('Error:', error);
      }
    );
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
