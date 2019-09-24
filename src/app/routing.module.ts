
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from './routes';

const taskRoutes: Routes = [
    { path:, component: AddTaskComponent },
    { path:"add-task/:id", component: AddTaskComponent },
    { path:"view-task", component: ViewTaskComponent },
    { path:"add-project", component: ProjectComponent },
    { path:"add-project/:id", component: ProjectComponent },
    { path:"add-user", component: UserComponent },
    { path:"add-user/:id", component: UserComponent },
    { path:"", redirectTo: "view-task", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule{}