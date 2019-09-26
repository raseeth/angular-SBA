import { TaskDetailViewModel } from '../../task/task-view/task-details.vm';

export class TasksModelBuilder {
    private tasks: TaskDetailViewModel[];

    private task: TaskDetailViewModel;

    constructor() {
        this.task = {
            endDate: "2019-2-1",
            startDate: "2019-1-1",
            priority: 0,
            id: 123,
            isCompleted: false,
            isParentTask: false,
            name: "Test",
            parentTask: null,
            projectId: 1122,
            userId: 4556
        } as TaskDetailViewModel;

        this.tasks = [
                    {
                        endDate: "2019-5-5",
                        startDate: "2019-1-1",
                        priority: 4,
                        id: 1233,
                        isCompleted: false,
                        isParentTask: false,
                        name: "Test task name",
                        parentTaskId: 8778,
                        parentTask: null,
                        projectId: 112,
                        userId: 4556
                    } as TaskDetailViewModel,
                    {
                        endDate: "2019-7-5",
                        startDate: "2019-4-1",
                        priority: 14,
                        id: 12133,
                        isCompleted: false,
                        isParentTask: true,
                        name: "Test task name two",
                        parentTask: null,
                        projectId: 1122,
                        userId: 4556
                    } as TaskDetailViewModel                
            ];
    }

    withDefaultTask(): TaskDetailViewModel {
        return this.task;
    }

    withDefaultTasks(): TaskDetailViewModel[] {
        return this.tasks;
    }
}