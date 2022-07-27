import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Server } from '../shared/Server';
import { ServerMessage } from '../shared/server-message';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  color: string | any;
  buttonText: string | any;
  serverStatus: string | any;
  isLoading: boolean | any;
  
  @Input()
  serverInput!: Server;

  @Output()
  serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }


  setServerStatus(isOnline: boolean){
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start'
    }
  }


  // toogleStatus(onlineStatus: boolean) {
  //   console.log(this.serverInput.name, ': ', onlineStatus);
  //   this.setServerStatus(!onlineStatus);
  // }

  
  makeLoading() {
    this.color = '#FFCA28',
    this.buttonText = 'Pending...',
    this.isLoading = true;
    this.serverStatus = 'Loading...';
  }


  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction called!');
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }


  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this.serverInput.id,
        // name: '',
        payload: false//'deactivate'
      };
    }
    else {
      return {  
        id: this.serverInput.id,
        // name: '',
        payload: true//'activate'
      };
    }
  }

}
