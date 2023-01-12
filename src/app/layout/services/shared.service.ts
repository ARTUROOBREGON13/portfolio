import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export interface MENU_EVENT{
  event:string,
  data?:any,
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceMenu {
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$:Observable<MENU_EVENT> = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: MENU_EVENT) {
      this.emitChangeSource.next(change);
  }

  constructor() { }
}
