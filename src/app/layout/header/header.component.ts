import { Component, OnDestroy } from '@angular/core';
import { menuItem } from '../menu/menu.component';
import { SharedServiceMenu } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{
  MENU_ITEMS:menuItem[] = [
    {
      'name': 'Home',
      'href': '/',
    },
    {
      'name': 'Projects',
      'href': '/projects',
    },
    {
      'name': 'About',
      'href': '/about',
    },
    {
      'name': 'Contact',
      'href': '/contact',
    },
  ];
  active:number;
  $menuSub:Subscription;


  constructor(private _sharedService:SharedServiceMenu){
    _sharedService.emitChange({event:'init', data: this.MENU_ITEMS});
    this.active = 0;
    this.$menuSub = _sharedService.changeEmitted$.subscribe((next)=>{
      if (next.event === 'menu-change')
        this.active = next.data;
    });
  }

  redirect(event:any){
    this._sharedService.emitChange({event: 'change', data:event})
  }

  openMenu(){
    this._sharedService.emitChange({event: 'open'})
  }

  ngOnDestroy(): void {
    this.$menuSub.unsubscribe();
  }
}
