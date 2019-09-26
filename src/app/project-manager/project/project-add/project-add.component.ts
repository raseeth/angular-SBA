import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project/project.service';
import { ModalService } from '../../service/modal/modal.service';
import { ListModalComponent } from '../../list-modal/list-modal.component';
import { ListItemViewModel } from '../../list-modal/list-item.vm';
import { UserService } from '../../service/user/user.service';
import { ListenerService } from '../../service/listener/listener.service';
import { ProjectDetailViewModel } from '../project-details.vm';
import { DatePipe } from '@angular/common';
import { UserDetailViewModel } from '../../user/user-details.vm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html'
})
export class AddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  isUpdate = false;
  users: UserDetailViewModel[];
  validDate = true;

  constructor(private formBuilder: FormBuilder,
    private modalService: ModalService,
    private projectService: ProjectService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private listnerService: ListenerService,
    private datePipe: DatePipe) { 
    }

  ngOnInit() {

    this.initializeForm();

    this.activatedRoute.params.subscribe(x => {
      if (x["id"]) {
        this.projectService.getById(x["id"]).subscribe(user => this.setFormData(user));
      }
    });

    this.userService.get().subscribe(x => {
      this.users = x;
    });
  }

  private initializeForm() {
    this.addProjectForm = this.formBuilder.group({
      "id": [],
      "name": ['', [Validators.required]],
      "enableStartAndEndDate": [false],
      "startDate": new FormControl({ value: '', disabled: true }),
      "endDate": new FormControl({ value: '', disabled: true }),
      "priority": ['0', [Validators.required]],
      "userId": new FormControl({value: ''}, [Validators.required])
    });
  }

  private setFormData(project: ProjectDetailViewModel): void {
    project.startDate = project.startDate ? this.datePipe.transform(project.startDate, "yyyy-MM-dd") : '';
    project.endDate = project.endDate ? this.datePipe.transform(project.endDate, "yyyy-MM-dd") : '';
    this.addProjectForm.patchValue(project);
    this.addProjectForm.get("enableStartAndEndDate").patchValue(project.startDate ? true : false);    
    this.onEnableStartDate(true);
    this.isUpdate = true;
  }

  onEnableStartDate(formLoad?: boolean): void {
    const x = this.addProjectForm.get("enableStartAndEndDate").value;

    if (x === true) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      this.addProjectForm.get("startDate").enable();     
      this.addProjectForm.get("endDate").enable();
      if (!formLoad) {
        this.addProjectForm.get("startDate")
        .patchValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
        this.addProjectForm.get("endDate")
          .patchValue(this.datePipe.transform(nextDay, 'yyyy-MM-dd'));
      }
    } else {
      this.addProjectForm.get("startDate").disable();
      this.addProjectForm.get("startDate").patchValue("");
      this.addProjectForm.get("endDate").disable();
      this.addProjectForm.get("endDate").patchValue("");
    }
  }

  onSearchUser(): void {
    const reference = this.modalService.open(ListModalComponent);
    (reference.componentInstance as ListModalComponent).items =
      this.users.map(y => new ListItemViewModel(y.id.toString(), (y.firstName + "," + y.lastName)));
    (reference.componentInstance as ListModalComponent).subject
      .subscribe((x: ListItemViewModel) => {
        this.addProjectForm.get('userId').patchValue(x.id);

        this.modalService.close();
      });
  }

  onSubmit(): void {
    if (this.addProjectForm.valid && this.validStartAndEndDate()) {
      const request = this.isUpdate ?
        this.projectService.put(this.addProjectForm.value as ProjectDetailViewModel) :
        this.projectService.post(this.addProjectForm.value as ProjectDetailViewModel);

      request.subscribe(() => {
        alert("Saved project successfully...");
        if (!this.isUpdate) {
          this.onReset();
        }
        this.listnerService.publish("refresh project");
      }, () => alert("Error whilst saving your data"));
    }
  }

  onReset(): void {
    this.addProjectForm.reset();
  }

  private validStartAndEndDate(): boolean {
    if (!this.addProjectForm.get("enableStartAndEndDate").value) {
      return true;
    }
    this.validDate = new Date(this.addProjectForm.get('startDate').value) <
      new Date(this.addProjectForm.get('endDate').value);;
    return this.validDate;
  }
}
