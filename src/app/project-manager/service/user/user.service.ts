import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { UserDetailViewModel } from '../../user/user-details.vm';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private config: ConfigService) { }

  get(): Observable<UserDetailViewModel[]> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/user`).pipe(map((y:UserDetailViewModel[]) => y)))
    );
  }

  getById(id: string): Observable<UserDetailViewModel> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.get(`${x}/user/${id}`).pipe(map((y:UserDetailViewModel) => y)))
    );
  }

  post(user: UserDetailViewModel): Observable<any> {
    return this.config.getBaseApi().pipe(
        flatMap(x => this.httpClient.post(`${x}/user`, user))
    );
  }

  put(user: UserDetailViewModel): Observable<any> {
      const id = user.id;
      return this.config.getBaseApi().pipe(
          flatMap(x => this.httpClient.put(`${x}/user/${id}`, user))
      );
  }

  delete(id: string): Observable<any> {
    return this.config.getBaseApi().pipe(
      flatMap(x => this.httpClient.delete(`${x}/user/${id}`)
    ));
  }
}
