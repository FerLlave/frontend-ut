
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnDestroy {
  mobileQuery:MediaQueryList;
  private _mobileQueryListener:() => void;
  
  constructor (changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery= media.matchMedia(' (max-width:600px) ');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  opened = true;

  public links = [
    {
      icon: 'restaurant_menu',
      label: 'Comidas',
      routerLink: 'food/food-list'
    },

    {
      icon: 'lunch_dining',
      label: 'Crear comida',
      routerLink: 'food/form'
    }
  ]


  public open() {
    if (this.opened) {
      this.opened = !this.opened;
    } else {
      this.opened = !this.opened;
    }
  }

}
