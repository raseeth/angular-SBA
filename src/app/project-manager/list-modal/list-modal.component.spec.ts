import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListModalComponent } from './list-modal.component';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { ListItemViewModel } from './list-item.vm';


describe('List modal component', () => {
    let component: ListModalComponent;

    beforeEach(() => {
        component = new ListModalComponent();
    });

    it("should call next on onSelection", () => {
        // Arrange
        spyOn(component.subject, "next").and.callThrough();
        const item = new ListItemViewModel("123","asdfa");

        // Act
        component.onSelection(item);

        // Assert
        expect(component.subject.next).toHaveBeenCalledWith(item);
    });

    it("should call complete on onDestroy", () => {
        // Arrange
        spyOn(component.subject, "complete").and.callThrough();

        // Act
        component.ngOnDestroy();

        // Assert
        expect(component.subject.complete).toHaveBeenCalled();
    });

    it("should filter data on onSearchTermChange", () => {
        // Arrange
        const items = [
            new ListItemViewModel("123", "test"),
            new ListItemViewModel("1233", "bla"),
            new ListItemViewModel("55", "troo")
        ];
        component.items = items;
        
        // Act
        component.onSearchTermChange("test");

        // Assert
        expect(component.items[0].description).toBe("test");
        expect(component.items[0].id).toBe("123");
    });

    it("should unfilter data on onSearchTermChange empty", () => {
        // Arrange
        const items = [
            new ListItemViewModel("123", "test"),
            new ListItemViewModel("1233", "bla"),
            new ListItemViewModel("55", "troo")
        ];
        component.items = items;
        
        // Act
        component.onSearchTermChange("");

        // Assert
        expect(component.items.length).toBe(items.length);
    });
});
