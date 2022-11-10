import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  @Output() userNameEvent = new EventEmitter<string>();
  userName = '';

  constructor() { }

  setUsername(){
    this.userNameEvent.emit(this.userName);
  }
}
