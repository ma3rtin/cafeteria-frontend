import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { RecuperarContrasena } from './interfaces/recuperar-contrasena.interface';
import { HeaderComponent } from '../../../../public/header/header.component';
import { Toast } from 'primeng/toast';
import { FooterComponent } from '../../../../public/footer/footer.component';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [HeaderComponent, Toast, FooterComponent, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css',
})
export class RecuperarContrasenaComponent {
  constructor() {}

  form!: FormGroup;

  private fb = inject(FormBuilder);

  messageService = inject(MessageService);
  usuarioService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nuevaContraseña: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])[A-Za-z\d]{6,}$/),
        ],
      ],
    });
  }

  recuperarContrasena() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario no válido',
      });
      return;
    }

    const credenciales: RecuperarContrasena = {
      email: this.form.value.email,
      nuevaContraseña: this.form.value.nuevaContraseña,
    };

    this.usuarioService.recuperarContrasena(credenciales).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Contraseña actualizada correctamente',
        });
      },
      error: (error) => {
        console.error('Error al actualizar contraseña:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la contraseña',
        });
      },
    });
  }
}
