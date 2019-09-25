import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { ProjectDetailViewModel } from 'src/app/project-manager/project/project-details.vm';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private config: ConfigService) { }

  get(): Observable<ProjectDetailViewModel[]> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/project`).pipe(map((y:ProjectDetailViewModel[]) => y)))
    );
  }

  getById(id: string): Observable<ProjectDetailViewModel> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/project/${id}`).pipe(map((y:ProjectDetailViewModel) => y)))
    );
  }

  post(project: ProjectDetailViewModel): Observable<any> {
    return this.config.getBaseApi().pipe(
        flatMap(x => this.httpClient.post(`${x}/project`, project))
    );
  }

  put(project: ProjectDetailViewModel): Observable<any> {
      const id = project.id;
      return this.config.getBaseApi().pipe(
          flatMap(x => this.httpClient.put(`${x}/project/${id}`, project))
      );
  }

  delete(id: string): Observable<any> {
    return this.config.getBaseApi().pipe(
        flatMap(x => this.httpClient.delete(`${x}/project/${id}`))
    );
  }
}
