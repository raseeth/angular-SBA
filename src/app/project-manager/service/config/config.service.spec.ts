import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ConfigService } from './config.service';

describe("Config Service", () => {
    let service: ConfigService;
    let httpClientMock: HttpClient;

    beforeEach(() => {
        httpClientMock = jasmine.createSpyObj("HttpClient", ["get", "put", "post"]);
        (httpClientMock.get as jasmine.Spy).and.returnValue(of({baseUrl: "test"}));
        service = new ConfigService(httpClientMock);
    });

    it("get should call http get as expected", () => {
        // Act
        service.getBaseApi().subscribe();

        // Assert
        expect(httpClientMock.get).toHaveBeenCalled();
    });

    it("get should not call http get when data is already available", () => {
        // Arrange
        service.getBaseApi().subscribe();

        // Act
        service.getBaseApi().subscribe();

        // Assert
        expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });
});