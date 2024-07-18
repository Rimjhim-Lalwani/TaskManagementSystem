import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { selectTasks } from './state/tasks.selector';
import { Store } from '@ngrx/store';
import { TasksService } from './task-list/tasks.service';
import { taskActions, TasksApiAction } from './state/task.actions';
import { TaskList } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { TaskFormDialog, TaskAddButton } from './task-add-form/task-add-form.component';
import { Task } from './task-list/task.model';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule, MatMenuModule, TaskList, CommonModule, TaskAddButton],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Task-Management-System';

  tasks$;
  
  

  constructor(private tasksService:TasksService,private store:Store) {
    this.tasks$ = this.store.select(selectTasks);
  }
  
  ngOnInit() {
    this.tasksService
    .getTasks()
    .subscribe((tasks)=>this.store.dispatch(TasksApiAction.getTasks({tasks})));
  }
}
