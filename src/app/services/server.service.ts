import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/Server';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrlserver: string = "https://localhost:44366/api/server/";

  constructor(private http: HttpClient) { }
  

  getServers() {
    return this.http.get(this.baseUrlserver);
  }


  // updateServer(server: Server) {
  //   const url = 'https://localhost:44366/api/server/' + server.id;
  //   this.http.put(url, server);
  // }


  // handleError(error: any) {
  //   console.log('error!');
  //   const errMsg = (error.message) ? error.message : error.status ? 
  //   `${error.status} - ${error.statusText}` : 'Server error'
    
  //   console.error(errMsg);

  //   return errMsg;
  // }


  handleServerMessage(message: ServerMessage) {
    const url = 'https://localhost:44366/api/server/' + message.id;
    return this.http.put(url, message);
  }
}
