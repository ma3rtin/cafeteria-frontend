import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../public/header/header.component';
import { FooterComponent } from '../../../../public/footer/footer.component';
import { CredencialesLogin } from './interfaces/credenciales-login.interface';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor() {}

  form!: FormGroup;

  private fb = inject(FormBuilder);
  messageService = inject(MessageService);
  usuarioService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]],
    });
  }

  iniciarSesion() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario no válido',
      });
      return;
    }

    const credenciales: CredencialesLogin = {
      email: this.form.value.email,
      contraseña: this.form.value.contraseña,
    };

    this.usuarioService.iniciarSesion(credenciales).subscribe({
      next: (response) => {
        if (typeof window !== 'undefined') {
          let token = JSON.stringify(response).replace(/"/g, '');
          localStorage.setItem('token', token);
        }
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales incorrectas',
        });
      },
    });
  }
}
