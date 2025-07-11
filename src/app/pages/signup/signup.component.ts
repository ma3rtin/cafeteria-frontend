import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../../../public/header/header.component';
import { FooterComponent } from '../../../../public/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);

  messageService = inject(MessageService);
  usuarioService = inject(UserService);
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])[A-Za-z\d]{6,}$/),
        ],
      ],
      confirmarContraseña: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  registrarse() {
    if (this.form.valid) {
      this.usuarioService.registrar(this.form.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Usuario registrado correctamente',
          });
          this.form.reset();
        },
        error: (error) => {
          console.error('Error al registrar el usuario:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al registrar el usuario',
          });
        },
      });
    }
  }
}
