import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list.component';


export const routes: Routes = [
    {
        path: '',
        component: TaskList,
        title: "Tasks home",
    }
    
];
