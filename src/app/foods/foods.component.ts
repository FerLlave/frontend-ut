import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.scss'
})
export class FoodsComponent {

}
