import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { completedTaskFirst, decreasingPriority, earliestDueDate, farthestDueDate, increasingPriority, pendingTaskFirst, selectHistory, selectTasks } from './state/tasks.selector';
import { Store } from '@ngrx/store';
import { TasksService } from './task-list/tasks.service';
import { taskActions, TasksApiAction } from './state/task.actions';
import { TaskList } from './task-list/task-list.component';
import { TaskCollectionComponent } from './history-collection/history-collection.component';
import { CommonModule } from '@angular/common';
import { TaskFormDialog, TaskAddButton } from './task-add-form/task-add-form.component';
import { Task } from './task-list/task.model';
import { History } from './history-collection/history.model';
import { historyActions, HistoryApiAction } from './state/history.actions';
import {MatMenuModule} from '@angular/material/menu';
import { MatRadioButton } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule, MatMenuModule, MatRadioButton,TaskList, TaskCollectionComponent, CommonModule, TaskAddButton],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'TaskManagementSystem';

  tasks$;
  historyList$;
  

  constructor(private tasksService:TasksService,private store:Store) {
    this.tasks$ = this.store.select(selectTasks);
    this.historyList$ = this.store.select(selectHistory);
  }
  
  ngOnInit() {
    this.tasksService
    .getTasks()
    .subscribe((tasks)=>this.store.dispatch(TasksApiAction.getTasks({tasks})));
    this.tasksService.getHistory().subscribe((logs)=>this.store.dispatch(HistoryApiAction.getHistory({logs})))
  }
}
