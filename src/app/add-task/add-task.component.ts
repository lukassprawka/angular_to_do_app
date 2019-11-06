import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTasksForm: FormGroup;

  constructor(private tasksService: TasksService, private authService: AuthService) {}

  ngOnInit() {
    this.newTasksForm = new FormGroup({
      newTasks: new FormArray([new FormControl(null, Validators.required)])
    });
  }

  addAnotherTaskField() {
    const tasksArray = this.newTasksForm.get('newTasks') as FormArray;
    tasksArray.push(new FormControl(null));
  }

  onAddNewTasksClick() {
    const tasksArray = this.newTasksForm.get('newTasks').value;
    const tasksToSaveInDB: Array<Task> = [];
    for (const task of tasksArray) {
      const newTask: Task = new Task(task, this.authService.user.uid, new Date().toLocaleString(), false);
      console.log(newTask);
      tasksToSaveInDB.push(newTask);
    }
    this.tasksService.addNewTasks(tasksToSaveInDB);

    this.newTasksForm = new FormGroup({
      newTasks: new FormArray([new FormControl(null, Validators.required)])
    });
  }
}
