import { ProjectDetailViewModel } from 'src/app/project-manager/project/project-details.vm';

export class ProjectModelBuilder {
    private projects: ProjectDetailViewModel[];

    private project: ProjectDetailViewModel;

    constructor() {
        this.project = {
            endDate: "2019-2-1",
            startDate: "2019-1-1",
            priority: 0,
            id: 123,
            name: "Test",
            completedTasks: 4,
            tasks: 4,
            userId: 345
        } as ProjectDetailViewModel;

        this.projects = [
                    {
                        endDate: "2019-5-5",
                        startDate: "2019-1-1",
                        priority: 14,
                        id: 1233,
                        completedTasks: 2,
                        tasks: 5,
                        name: "Test project name",
                        userId: 8778
                    } as ProjectDetailViewModel,
                    {
                        endDate: "2019-7-5",
                        startDate: "2019-4-1",
                        priority: 4,
                        id: 12133,
                        completedTasks: 2,
                        tasks: 2,
                        name: "Test project second name",
                        userId: 3121
                    } as ProjectDetailViewModel                
            ];
    }

    withDefaultProject(): ProjectDetailViewModel {
        return this.project;
    }

    withDefaultprojects(): ProjectDetailViewModel[] {
        return this.projects;
    }
}