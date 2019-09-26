import { ModalService } from './modal.service';

describe('Modalervice', () => {

  let subject: ModalService;
  let ngModel;
  let close;

  beforeEach(() => {
    close = jasmine.createSpy("close");
    ngModel = {
      "open" : jasmine.createSpy("open").and.returnValue({
        close
      })
    };
    subject = new ModalService(ngModel);
  });

  it('should be created', () => {
    expect(subject).toBeDefined();
  });

  it('should return reference on open call', () => {
    // Act
    const response = subject.open(null);

    // Assert
    expect(response).toBeDefined();
  });

  it('should call reference close on close call', () => {
    // Arrange
    subject.open(null);

    // Act
    subject.close();

    // Assert
    expect(close).toHaveBeenCalled();
  });
});
