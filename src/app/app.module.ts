import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './project-manager/user/user-add/user-add.component';
import { ViewUserComponent } from './project-manager/user/user-view/user-view.component';
import { UserComponent } from './project-manager/user/user.component';
import { ViewTaskComponent } from './project-manager/task/task-view/task-view.component';
import { AddTaskComponent } from './project-manager/task/task-add/task-add.component';
import { AddProjectComponent } from './project-manager/project/project-add/project-add.component';
import { ViewProjectComponent } from './project-manager/project/project-view/project-view.component';
import { ProjectComponent } from './project-manager/project/project.component';
import { ViewProjectDetailsComponent } from './project-manager/project/project-view/project-view-details/project-view-details.component';
import { ViewTaskDetailsComponent } from './project-manager/task/task-view/task-view-details/task-view-details.component';
import { ViewUserDetailsComponent } from './project-manager/user/user-view/user-view-details/user-view-details.component';
import { ConfigService } from './project-manager/service/config/config.service';
import { UserService } from './project-manager/service/user/user.service';
import { TaskService } from './project-manager/service/task/task.service';
import { ListModalComponent } from './project-manager/list-modal/list-modal.component';
import { ModalService } from './project-manager/service/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project-manager/service/project/project.service';
import { ListenerService } from './project-manager/service/listener/listener.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUserComponent,
    UserComponent,
    ViewTaskComponent,
    AddTaskComponent,
    AddProjectComponent,
    ViewProjectComponent,
    ProjectComponent,
    ViewProjectDetailsComponent,
    ViewTaskDetailsComponent,
    ViewUserDetailsComponent,
    ListModalComponent
  ],
  entryComponents: [
    ListModalComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule
  ],
  providers: [
    DatePipe,
    ListenerService,
    ConfigService,
    UserService,
    TaskService,
    ModalService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
