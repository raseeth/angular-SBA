import { Component, OnInit } from '@angular/core';
import { UserDetailViewModel } from '../user-details.vm';
import * as _ from "underscore";
import { UserService } from 'src/app/project-manager/service/user/user.service';
import { ListenerService } from 'src/app/project-manager/service/listener/listener.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class ViewUserComponent implements OnInit {

  filteredUsers: UserDetailViewModel[];
  userSearchTerm: string;
  users: UserDetailViewModel[];

  constructor(private userService: UserService, private listenerService: ListenerService) { }

  ngOnInit() {
    this.userService.get().subscribe(x => {
      this.users = x;
      this.filteredUsers = x;
    });

    this.listenerService.listener().subscribe(x => {
      if (x && x === "refresh user") {
        this.userService.get().subscribe(x => {
          this.users = x;
          this.filteredUsers = x;
        });
      }
    });
  }

  sortBy(prop: string): void {
    this.filteredUsers =  _.sortBy(this.filteredUsers, prop);
  }
  
  onSearchTermChange(term: string): void {
    this.filteredUsers = term ? this.users.filter((x: UserDetailViewModel) => {
      return x.employeeId.toString().toLowerCase().indexOf(term.toLowerCase()) > -1
        || x.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
        || x.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }) : this.users;
  }
}
