import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';
import { History } from '../history-collection/history.model';

@Injectable({providedIn: 'root'})

export class TasksService {
    getTasks(): Observable<Array<Task>>{
        const taskJson = localStorage.getItem('tasks');
        if(!taskJson){
            localStorage.setItem('tasks',JSON.stringify([]));
        }
        const tasks: Array<Task> = taskJson? JSON.parse(taskJson): [];

        return of(tasks)
    }
    getHistory(): Observable<History[]>{
        const historyJson = localStorage.getItem('history');
        if(!historyJson){
            localStorage.setItem('history',JSON.stringify([]));
        }
        const history: History[] = historyJson? JSON.parse(historyJson): [];
        return of(history)
    }
}