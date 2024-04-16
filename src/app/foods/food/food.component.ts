import { Component,Input } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { RouterModule } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [RouterModule, MatButtonModule,MatCardModule,TitleCasePipe,CurrencyPipe,MatIcon],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {

  @Input() food?:Food;
  @Output() eventDeleteFood = new EventEmitter<boolean>;
  constructor(public serviceFood:FoodService, public dialog:MatDialog){

  }

  openDialog(deleteFood:Food) {

      const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data:deleteFood,  
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.delete(deleteFood);
      }
    });
  }

  public delete(food:Food){
    this.serviceFood.deleteFood(food).subscribe({
      next:() => console.log('Se esta eliminando'),
      error:(e) => console.error (e),
      complete:() => this.deleteFoodEvent(true),     
      
    })

  }

  public deleteFoodEvent(value:boolean){
    this.eventDeleteFood.emit(value);
  }


}
