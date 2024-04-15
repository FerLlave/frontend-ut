import{Route} from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { FormFoodComponent } from './form-food/form-food.component';
import { FoodsComponent } from './foods.component';
import { DetailsFoodComponent } from './details-food/details-food.component';

export default[



    {
        path:'food-list',
        component:FoodListComponent,
        title:'Lista de comida'
    },
    
    {
        path:'form',
        component:FormFoodComponent,
        title:'Crear comida'
    },

    {
        path:'details-food/:id',
        component:DetailsFoodComponent,
        title:'Detalles'
    },
    {
        path:'form/:id',
        component:FormFoodComponent,
        title:'Actualizar comida'
    }

]satisfies Route[];
