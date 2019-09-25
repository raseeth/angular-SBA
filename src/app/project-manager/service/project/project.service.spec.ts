import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { of } from 'rxjs';
import { ProjectModelBuilder } from './project-model.builder';

describe('ProjectService', () => {
  let service: ProjectService;
    let httpClientMock: HttpClient;
    let configServiceMock: ConfigService;

    beforeEach(() => {
        httpClientMock = jasmine.createSpyObj("HttpClient", ["get", "put", "post"]);
        (httpClientMock.get as jasmine.Spy).and.returnValue(of({}));
        (httpClientMock.put as jasmine.Spy).and.returnValue(of({}));
        (httpClientMock.post as jasmine.Spy).and.returnValue(of({}));

        configServiceMock = jasmine.createSpyObj("ConfigService", ["getBaseApi"]);
        (configServiceMock.getBaseApi as jasmine.Spy).and.returnValue(of("testApi"));

        service = new ProjectService(httpClientMock, configServiceMock);
    });

    it("get should call http get", () => {
        // Act
        service.get().subscribe();

        // Assert
        expect(httpClientMock.get).toHaveBeenCalled();
    });

    it("getById should call http get", () => {
        // Act
        service.getById("123").subscribe();

        // Assert
        expect(httpClientMock.get).toHaveBeenCalled();
    });

    it("post should call http post", () => {
        // Arrange
        const model = new ProjectModelBuilder().withDefaultProject();

        // Act
        service.post(model).subscribe();

        // Assert
        expect(httpClientMock.post).toHaveBeenCalled();
    });

    it("put should call http put", () => {
        // Arrange
        const model = new ProjectModelBuilder().withDefaultProject();

        // Act
        service.put(model).subscribe();

        // Assert
        expect(httpClientMock.put).toHaveBeenCalled();
    });
});
