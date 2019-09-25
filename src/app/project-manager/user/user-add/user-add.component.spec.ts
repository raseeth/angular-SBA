import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './user-add.component';
import { UserService } from 'src/app/project-manager/service/user/user.service';
import { of } from 'rxjs';
import { UsersModelBuilder } from 'src/app/project-manager/service/user/user-model.builder';
import { FormBuilder } from '@angular/forms';
import { ListenerService } from 'src/app/project-manager/service/listener/listener.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let mockUserService: UserService;
  let mockActivatedRoute;
  let userBuilder: UsersModelBuilder;
  let mockListener: ListenerService;

  beforeEach(() => {
    userBuilder = new UsersModelBuilder();
    mockUserService = jasmine.createSpyObj("userService", ["post", "get", "put", "getById"]);
    (mockUserService.get as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUsers()));
    (mockUserService.post as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.put as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.getById as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUser()));

    mockActivatedRoute = {
      params: of({})
    }

    mockListener = jasmine.createSpyObj("listener", ["publish", "listener"]);

    component = new AddUserComponent(new FormBuilder(), mockActivatedRoute, mockUserService,mockListener);
  });

  it("should default data on ngOninit", () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component.addUserForm).toBeDefined();
  });

  it("should call the task service on load", () => {
    // Arrange
    mockActivatedRoute = {
      params: of({
        "id": "123"
      })
    };
    component = new AddUserComponent(new FormBuilder(), mockActivatedRoute, mockUserService,mockListener);

    // Act
    component.ngOnInit();

    // Assert
    expect(mockUserService.getById).toHaveBeenCalledWith("123");
  });

  describe("onSubmit", () => {
    it("should call userService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();
      component.addUserForm.patchValue(userBuilder.withDefaultUser());

      // Act
      component.onSubmit();

      // Assert
      expect(mockUserService.post).toHaveBeenCalled();
    });

    it("should call userService put as expecte for valid form details", () => {
      // Arrange
      mockActivatedRoute = {
        params: of({
          "id": "123"
        })
      };
      component = new AddUserComponent(new FormBuilder(), mockActivatedRoute, mockUserService,mockListener);
      component.ngOnInit();
      component.addUserForm.patchValue(userBuilder.withDefaultUser());

      // Act
      component.onSubmit();

      // Assert
      expect(mockUserService.put).toHaveBeenCalled();
    });

    it("should call taskService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();

      // Act
      component.onSubmit();

      // Assert
      expect(mockUserService.post).not.toHaveBeenCalled();
    });
  });

  it("should call form reset on onReset", () => {
    // Arrange
    component.ngOnInit();
    spyOn(component.addUserForm, "reset").and.callThrough();
    
    // Act
    component.onReset();

    // Assert
    expect(component.addUserForm.reset).toHaveBeenCalled();
  });
});
