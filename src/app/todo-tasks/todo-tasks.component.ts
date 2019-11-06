import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.css']
})
export class TodoTasksComponent implements OnInit {
  tasksList: Array<Task>;

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasksListObservable().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks.filter(t => t.isDone === false);
    });
  }

  ngOnInit() {}

  onMoveToDoneClick(task: Task) {
    this.tasksService.moveToDone(task);
  }

  onRemoveClick(task: Task) {
    this.tasksService.remove(task);
  }

  getColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green';
  }
}
