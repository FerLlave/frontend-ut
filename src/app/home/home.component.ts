import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/** lugar, fecha, imagenes, nombre propietario, */

interface Local  {

  lugar:string,
  fecha:Date,
  imagenes:string[],
  propietario:string

}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
