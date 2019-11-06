import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksListObservable = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpService: HttpService) {
  }

  addNewTasks(tasks: Array<Task>) {
    const list = this.tasksListObservable.getValue().concat(tasks);
    // for (const task of tasks) {
    //   list.push(task);
    // }
    this.tasksListObservable.next(list);
    this.saveTasksInDB();
  }

  moveToDone(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListObservable.getValue();
    this.tasksListObservable.next(list);
    this.saveTasksInDB();
  }

  remove(task: Task) {
    const list = this.tasksListObservable.getValue().filter(e => e !== task);
    this.tasksListObservable.next(list);
    this.removeTaskFromDB(task);
  }

  getTasksListObservable(): Observable<Array<Task>> {
    this.getTasksFromDB();
    return this.tasksListObservable.asObservable();
  }

  getTasksFromDB(){
    this.httpService.getTasks().subscribe(list => {
      this.tasksListObservable.next(list);
    });
  }

  saveTasksInDB() {
    this.httpService.saveTasks(this.tasksListObservable.getValue()).subscribe(data => {
      console.log(data);
      // po zapisie zaczytujemy jeszcze raz listę tasków
      this.getTasksFromDB();
    });
  }

  removeTaskFromDB(task: Task) {
    this.httpService.deleteTask(task);
  }
}
