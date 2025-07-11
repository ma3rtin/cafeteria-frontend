import { Component } from '@angular/core';
import { CarritoListComponent } from "./components/carrito-list/carrito-list.component";
import { HeaderComponent } from '../../../../public/header/header.component';
import { FooterComponent } from '../../../../public/footer/footer.component';
@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, FooterComponent, CarritoListComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

}
