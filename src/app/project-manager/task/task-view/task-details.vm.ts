export class TaskDetailViewModel {
    name: string;
    parentTask?: TaskDetailViewModel;
    priority: number;
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    isParentTask: boolean;
    id?: number;
    parentTaskId?: number;
    projectId: number;
    userId: number;
}