import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormsModule,
 
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-food',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
  ],
  templateUrl: './form-food.component.html',
  styleUrl: './form-food.component.scss',
})
export class FormFoodComponent implements OnInit {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public servicioComida: FoodService,
    public router: Router
  ) {}

  route: ActivatedRoute = inject(ActivatedRoute);
  foodId: number = -1;
  edit: boolean = false;
  food?: Food = {
    id: 0,
    name: '',
    description: '',
    category: '',
    image: '',
    price: 0,
  };

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.edit = true;
      console.log('Esta se puede actualizar' + this.edit);
      this.foodId = Number(this.route.snapshot.params['id']);
      this.servicioComida.getOneFood(this.foodId).subscribe({
        next: (value) => this.updateForm(value),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
  }

  public updateForm(food: Food): void {
    if (food) {
      this.form.patchValue({
        name: food.name,
        category: food.category,
        description: food.description,
        image: food.image,
        price: food.price.toString(),
      });
    }
  }
  public updateData() {
    if (this.form.status == 'VALID') {
      //validando cada dato
      if (
        this.name?.value &&
        this.description?.value &&
        this.category?.value &&
        this.image?.value &&
        this.price?.value
      ) {
        let price = parseInt(this.price.value);

        //creando el objeto
        let comida: Food = {
          id: this.foodId,
          name: this.name.value,
          description: this.description.value,
          category: this.category?.value,
          image: this.image?.value,
          price: price,
        };

        //actualizando
        this.servicioComida.addFood(comida).subscribe({
          next: (value) => (this.food = value),
          error: (e) => console.error(e),
          complete: () => this.router.navigate(['/food/food-list']),
        });

       }
    }
  }
  public sendData() {
    //validando formulario
    if (this.form.status == 'VALID') {
      //validando cada dato
      if (
        this.name?.value &&
        this.description?.value &&
        this.category?.value &&
        this.image?.value &&
        this.price?.value
      ) {
        let price = parseInt(this.price.value);

        //creando el objeto
        let comida: Food = {
          name: this.name.value,
          description: this.description.value,
          category: this.category?.value,
          image: this.image?.value,
          price: price,
        };

        //Añadiendo nueva comida
        console.log(comida);
        
        this.servicioComida.addFood(comida).subscribe({
          next: (value) => (this.food = value),
          error: (e) => console.error(e),
          complete: () =>this.router.navigate(['/food/food-list']),
        });
        
      }
    }
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get image() {
    return this.form.get('image');
  }

  get category() {
    return this.form.get('category');
  }

  get price() {
    return this.form.get('price');
  }
}
