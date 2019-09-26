
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from './routes';

import { AddTaskComponent } from './project-manager/task/task-add/task-add.component';
import { ViewTaskComponent } from './project-manager/task/task-view/task-view.component';
import { UserComponent } from './project-manager/user/user.component';
import { ProjectComponent } from './project-manager/project/project.component';

const routes: Routes = [
    { path:ROUTES.ADDPROJECT, component: ProjectComponent },
    { path:ROUTES.ADDPROJECTID, component: ProjectComponent },
    { path:ROUTES.ADDTASK, component: AddTaskComponent },
    { path:ROUTES.ADDTASKID, component: AddTaskComponent },
    { path:ROUTES.VIEWTASK, component: ViewTaskComponent },
    { path:ROUTES.ADDUSER, component: UserComponent },
    { path:ROUTES.ADDUSERID, component: UserComponent },
    { path:ROUTES.ADDPROJECT, redirectTo: ROUTES.ADDPROJECT, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule{}