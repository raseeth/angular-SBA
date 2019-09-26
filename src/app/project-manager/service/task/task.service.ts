import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { TaskDetailViewModel } from '../../task/task-view/task-details.vm';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient, private config: ConfigService) { }

  get(): Observable<TaskDetailViewModel[]> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/task`).pipe(map((y:TaskDetailViewModel[]) => y)))
    );
  }

  getById(id: string): Observable<TaskDetailViewModel> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/task/${id}`).pipe(map((y:TaskDetailViewModel) => y)))
    );
  }

  post(task: TaskDetailViewModel): Observable<any> {
    return this.config.getBaseApi().pipe(
        flatMap(x => this.httpClient.post(`${x}/task`, task))
    );
  }

  put(task: TaskDetailViewModel): Observable<any> {
      const id = task.id;
      return this.config.getBaseApi().pipe(
          flatMap(x => this.httpClient.put(`${x}/task/${id}`, task))
      );
  }
}
