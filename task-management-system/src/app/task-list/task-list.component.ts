import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task-list/task.model';
import { CommonModule } from '@angular/common';
import { TaskEditButtonComponent, EditFormDialog } from '../edit-task-form/edit-task-form.component';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskAddButton } from "../task-add-form/task-add-form.component";
import {MatMenuModule} from '@angular/material/menu';
import { Store } from '@ngrx/store';
import {selectTasks } from '../state/tasks.selector';
import { taskActions } from '../state/task.actions';
import { take } from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { TaskDetailButtonComponent,TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatMenuModule, TaskEditButtonComponent, EditFormDialog, MatCardModule, MatCheckboxModule, TaskAddButton, TaskDetailButtonComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskList {
  tasks$;

  constructor(private store:Store) {
    this.tasks$ = this.store.select(selectTasks);
  }

  onAddTask(task:Task){
    this.store.dispatch(taskActions.addTask({task}));
    console.log(task.duedate);
    const logs = {id:task.id,name:task.name ,title: "Added task", timeStamp:new Date().toLocaleString()};
   
  }
  onRemoveTask(task:Task){
    this.store.dispatch(taskActions.removeTask({taskId:task.id}));
    const logs = {id:task.id,name:task.name ,title: "Rremoved task", timeStamp:new Date().toLocaleString()};
    
  }
  onEditTask(task:Task){
    // console.log(task);
    this.store.dispatch(taskActions.editTask({task}));
    const logs = {id:task.id,name:task.name,title: "Edited task", timeStamp:new Date().toLocaleString()};
    
  }
  onStatusChange(t:Task,event:any){
    // console.log(task);
    const task = {...t,status:event.checked? 'completed' : 'pending'};
    console.log("inside status change")
    this.store.dispatch(taskActions.editTask({task}));
    const logs = {id:task.id,name:task.name,title: `Marked as ${task.status}`, timeStamp:new Date().toLocaleString()};
    
  }
}