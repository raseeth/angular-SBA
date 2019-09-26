import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDetailViewModel } from '../../user-details.vm';
import { UserService } from '../../../service/user/user.service';
import { ListenerService } from '../../../service/listener/listener.service';

@Component({
  selector: 'app-user-view-details',
  templateUrl: './user-view-details.component.html'
})
export class ViewUserDetailsComponent implements OnInit {

  @Input() userDetails: UserDetailViewModel;
  constructor(private userService: UserService, private listenerService: ListenerService) { }

  ngOnInit() {
  }

  onDeleteClick(id: string): void {
    this.userService.delete(id).subscribe(x => {
      this.listenerService.publish("refresh user");
    });
  }
}
