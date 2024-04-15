import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-details-food',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    TitleCasePipe,
  ],
  templateUrl: './details-food.component.html',
  styleUrl: './details-food.component.scss',
})
export class DetailsFoodComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    public serviceFood: FoodService
  ) {}

  route: ActivatedRoute = inject(ActivatedRoute);
  foodId: number = -1;
  food?: Food = {
    id: 0,
    name: '',
    description: '',
    category: '',
    image: '',
    price: 0,
  };

  ngOnInit(): void {
    this.foodId = Number(this.route.snapshot.params['id']);
    this.serviceFood.getOneFood(this.foodId).subscribe({
      next: (value) => (this.food = value),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
