import { ListenerService } from './listener.service';

describe("Listener Service", () => {
    let service: ListenerService;

    beforeEach(() => {
        service = new ListenerService();
    });

    it("publish should call listener", () => {
        // Act
        // Assert
        service.listener().subscribe(x => {
            expect(x).toBe("true");
        });
        service.publish("true");
    });
});