import { Component, OnInit, OnDestroy } from '@angular/core';
import { menuItem } from './layout/menu/menu.component';
import { SharedServiceMenu } from './layout/services/shared.service';
import { Subscription } from 'rxjs';
import { MENU_EVENT } from './layout/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title:string = 'portfolio';
  navShown:boolean = false;
  selectedNav = 0;
  navMenu:menuItem[] = [];
  $menuSub:Subscription;

  constructor( private _sharedService: SharedServiceMenu, private router:Router){
    this.$menuSub = this._sharedService.changeEmitted$.subscribe((next:MENU_EVENT)=>{
      switch (next.event){
        case 'init':
          this.navMenu = next.data;
          break;
        case 'change':
          this.selectedNav = next.data;
          break;
        case 'open':
          this.navShown = true;
          break;
      }
    });
  }

  redirect(index:number){
    this.selectedNav = index;
    this.router.navigateByUrl(this.navMenu[index].href);
    this._sharedService.emitChange({event: 'menu-change', data:index});
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.$menuSub.unsubscribe();
  }
}
