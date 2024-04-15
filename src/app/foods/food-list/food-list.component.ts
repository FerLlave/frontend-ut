import { Component, OnInit } from '@angular/core';
import { FoodService } from '../shared/food.service';
import { Food } from '../shared/food.model';
import { FoodComponent } from '../food/food.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [FoodComponent],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss',
})
export class FoodListComponent implements OnInit {
  data: Food[] = [];

  constructor(public serviceFood: FoodService) {}

  ngOnInit(): void {
    //this.data = this.serviceFood.getAll();
    this.getAllFoods();
    console.log(this.data);
  }

  public getAllFoods() {
    this.serviceFood.getAll().subscribe({
      next: (data) => (this.data = data),
      error: (e) => console.error(e),
      complete: () => console.info('Complete'),
    });
  }

  public ItemDeleted(deleted:boolean){
    if (deleted) {
      this.getAllFoods();
    }
 
  }
}
