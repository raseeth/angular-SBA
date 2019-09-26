import { UserDetailViewModel } from '../../user/user-details.vm';

export class UsersModelBuilder {
    private users: UserDetailViewModel[];

    private user: UserDetailViewModel;

    constructor() {
        this.user = new UserDetailViewModel("First name",
            "Last name",
            "15",
            12314);
        this.users = [
                new UserDetailViewModel("Test user name",
                    "Test parent user name",
                    "15222", 
                    456),
                new UserDetailViewModel("Test first second", 
                    "Test name second",
                    "1922",
                    222)
            ];
    }

    withDefaultUser(): UserDetailViewModel {
        return this.user;
    }

    withDefaultUsers(): UserDetailViewModel[] {
        return this.users;
    }
}