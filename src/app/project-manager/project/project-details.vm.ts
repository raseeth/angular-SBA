import { TaskDetailViewModel } from '../task/task-view/task-details.vm';

export class ProjectDetailViewModel {
    constructor(
        public name: string,
        public priority: number,
        public startDate: string,
        public endDate: string,
        public id?: number,
        public userId?: number,
        public tasks?: number,
        public completedTasks?: number
    ) {}
}