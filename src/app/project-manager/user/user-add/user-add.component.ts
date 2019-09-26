import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { UserDetailViewModel } from '../user-details.vm';
import { ListenerService } from '../../service/listener/listener.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  isUpdate = false;

  constructor(private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private userService: UserService,
      private listnerService: ListenerService) { }

  ngOnInit() {
    this.initForm();

    this.loadData();
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const request = this.isUpdate ?
        this.userService.put(this.addUserForm.value as UserDetailViewModel) :
        this.userService.post(this.addUserForm.value as UserDetailViewModel);

      request.subscribe(() => {
        alert("Saved user successfully...");
        this.onReset();
        this.listnerService.publish("refresh user");
      }, () => alert("Error whilst saving your data"));
    }
  }

  onReset(): void {
    this.addUserForm.reset();
  }

  private loadData() {
    this.route.params.subscribe(x => {
      if (x["id"]) {
        this.userService.getById(x["id"]).subscribe(user => {
          this.addUserForm.patchValue(user);
          this.isUpdate = true;
        });
      }
    });
  }

  private initForm() {
    this.addUserForm = this.formBuilder.group({
      "id": [],
      "firstName": ['', [Validators.required]],
      "lastName": ['', [Validators.required]],
      "employeeId": ['', [Validators.required]],
    });
  }
}
