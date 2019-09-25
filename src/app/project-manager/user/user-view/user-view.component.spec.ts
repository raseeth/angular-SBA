import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './user-view.component';
import { UsersModelBuilder } from 'src/app/project-manager/service/user/user-model.builder';
import { ListenerService } from 'src/app/project-manager/service/listener/listener.service';
import { UserService } from 'src/app/project-manager/service/user/user.service';
import { of } from 'rxjs';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let userBuilder: UsersModelBuilder;
  let mockUserService: UserService;
  let mockListener: ListenerService;
  
  beforeEach(() => {
    userBuilder = new UsersModelBuilder();
    mockUserService = jasmine.createSpyObj("userService", ["post", "get", "put", "getById"]);
    (mockUserService.get as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUsers()));
    (mockUserService.post as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.put as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.getById as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUser()));

    mockListener = jasmine.createSpyObj("listener", ["publish", "listener"]);
    (mockListener.listener as jasmine.Spy).and.returnValue(of({}));

    component = new ViewUserComponent(mockUserService, mockListener);
  });

  it("should init data on ngOnInit", () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(mockUserService.get).toHaveBeenCalled();
  });

  it("should return filtered items on onSearchTermChange", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.onSearchTermChange("second");

    // Assert
    expect(component.filteredUsers[0].firstName).toContain("second");
  });

  it("should return entire items on onSearchTermChange with empty", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.onSearchTermChange("");

    // Assert
    expect(component.filteredUsers.length)
      .toEqual(userBuilder.withDefaultUsers().length);
  });
});
