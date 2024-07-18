import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../task-list/task.model";
export const selectTasks = createFeatureSelector<Array<Task>>('tasks');


export const taskList = createSelector(
    selectTasks,
    (tasks) => { tasks }
);

