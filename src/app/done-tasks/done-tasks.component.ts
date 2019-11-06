import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.css']
})
export class DoneTasksComponent implements OnInit {
  doneTasksList: Array<Task>;

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasksListObservable().subscribe((tasks: Array<Task>) => {
      this.doneTasksList = tasks.filter(t => t.isDone === true);
    });
  }

  ngOnInit() {}
}
