import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';
import { Server } from 'src/app/shared/Server';
import { ServerMessage } from 'src/app/shared/server-message';

// const SampleServers = [
//   {id: 1, name: 'dev-web', isOnline: true },
//   {id: 2, name: 'dev-mail', isOnline: false },
//   {id: 3, name: 'prod-web', isOnline: true },
//   {id: 4, name: 'prod-email', isOnline: true }

// ];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  // servers: Server[] = SampleServers;
  public servers: Server[] = [];
  timerSubscription: any;
  editId: any;

  ngOnInit(): void {
    this.refreshData();
    // this.serverService.getServers().subscribe((res: any) => {
    //   this.servers = res;
    // });
  }


  // ngOnDestroy(){
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  // }

  refreshData() {
    this.serverService.getServers().subscribe((res: any) => {
      this.servers = res;
  });

  this.subscribeToData();
}


  subscribeToData() {
    this.timerSubscription = timer(5000).subscribe(() => {
      this.refreshData();
    });
  }

  // viewEdit(id: any, name: string, isonline: boolean) {
  //   this.editId = id
  //   name: name
  //   isonline: isonline
  // }


  // sendMessage(id: any) {
  //   this.serverService.updateServer(id).subscribe((res:any) => {
  //     console.log('Message sent to server: ', res);
  //   });
  // }

  sendMessage(message: ServerMessage) {
    this.serverService.handleServerMessage(message).subscribe((res:any) => 
      console.log('Message sent to server: ', message),
      err => console.log('Error: ', err));
  }


}
