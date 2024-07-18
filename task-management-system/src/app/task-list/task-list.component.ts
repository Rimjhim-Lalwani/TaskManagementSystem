import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task-list/task.model';
import { CommonModule } from '@angular/common';
import { TaskEditButtonComponent, EditFormDialog } from '../edit-task-form/edit-task-form.component';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskAddButton } from "../task-add-form/task-add-form.component";
import {MatMenuModule} from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { completedTaskFirst, decreasingPriority, earliestDueDate, farthestDueDate, increasingPriority, pendingTaskFirst, selectTasks } from '../state/tasks.selector';
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
  onSortByDecreasingPriority(){
    this.tasks$ = this.store.select(decreasingPriority);
  }
  onSortByIncreasingPriority(){
    this.tasks$ = this.store.select(increasingPriority);
  }
  onSortByCompletedFirst(){
    this.tasks$ = this.store.select(completedTaskFirst);
  }
  onSortByPendingFirst(){
    this.tasks$ = this.store.select(pendingTaskFirst);
  }
  onSortByEarliestDueDateFirst(){
    this.tasks$ = this.store.select(earliestDueDate);
  }
  onSortByFarthestDueDateFirst(){
    this.tasks$ = this.store.select(farthestDueDate);
  }

  downloadCSV() {
    this.tasks$.pipe(take(1)).subscribe(tasks => {
      const csvData = this.tasksToCSV(tasks);
      this.extractToCSV(csvData, 'tasks.csv');
    });
  }

  tasksToCSV(tasks: Task[]): string {
    const header = 'ID,Name,Description,Due Date,Priority Level,Status\n';
    const rows = tasks.map(task => (
      `${task.id},${task.name},${task.description},${task.duedate.split(',')[0]},${task.priorityLevel},${task.status}`
    )).join('\n');

    return header + rows;
  }

  extractToCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}