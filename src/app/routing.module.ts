
const taskRoutes: Routes = [
    { path: TASKROUTES.HOME, component: TaskManagerComponent,
        children: [
          { path: TASKROUTES.ADD, component: TaskAddComponent },
          { path: TASKROUTES.VIEW, component: TaskViewComponent },
          { path: TASKROUTES.EDIT, component: TaskEditComponent }
        ],
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule{}