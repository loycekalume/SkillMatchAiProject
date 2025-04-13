import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleModalService {
  private modalVisibility = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibility.asObservable();

  show() {
    this.modalVisibility.next(true);
  }

  hide() {
    this.modalVisibility.next(false);
  }
}
