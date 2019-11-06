import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // readonly URL_DB = 'https://my-json-server.typicode.com/lukassprawka/My-JSON-Server-todos/todos';
  readonly URL_DB = 'https://angulardb-0cd4.restdb.io/rest/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getParams(): HttpParams {
    const userId = this.authService.user.uid;
    const query = {'userId': userId};
    return new HttpParams().set('apikey', '5d5fe13ca592085130522608')
    .append('q', JSON.stringify(query));
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.URL_DB, { params: this.getParams() });
  }

  saveTasks(list: Array<Task>): Observable<Array<Task>> {
    return this.http.post<Array<Task>>(this.URL_DB, list, { params: this.getParams() });
  }

  deleteTask(task: Task) {
    this.http.delete<Task>(this.URL_DB + '/' + task._id, { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
  }

  // dla MongoDB robimy put, mój mock serwer nie obsługuje
  // saveTasks(list: Array<Task>) {
  //   this.http.put(this.URL_DB, list, { params: this.param }).subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
