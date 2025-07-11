import { ToastModule } from 'primeng/toast';
import { Component, inject } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../../public/footer/footer.component";
import { HeaderComponent } from '../../../../public/header/header.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FooterComponent,HeaderComponent, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    router = inject(Router);
  irHacia(ruta:string) {
    this.router.navigate([ruta]);
  }
}
