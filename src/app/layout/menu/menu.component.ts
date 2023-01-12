import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface menuItem {
  name:string,
  href:string,
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input('menu') menu?:menuItem[];
  @Input('active') active?:number;
  @Output('select') selectItemEvent = new EventEmitter<number>();
  @Output('open') openItemEvent = new EventEmitter<{}>();

  constructor(){}

  Select(index:number){
    this.active = index;
    this.selectItemEvent.emit(index);
  }

  OpenMenu(){
    this.openItemEvent.emit({});
  }
}
