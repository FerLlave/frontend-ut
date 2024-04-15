import { Component , Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Food } from '../../../foods/shared/food.model';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public food: Food){

  }

}
