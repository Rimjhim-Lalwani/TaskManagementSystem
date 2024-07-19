import {ChangeDetectionStrategy, Component, inject, model, signal,Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {v4 as uuidv4} from 'uuid';
import {MAT_DIALOG_DATA,MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogRef,MatDialogTitle,} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { Task } from '../task-list/task.model';

export interface TaskData {
  name: string;
  description: string;
  duedate: string;
  priorityLevel: string;

}

@Component({
  selector: 'app-task-add-button',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  template: `
    <button mat-raised-button style="background-color:rgb(33, 130, 228);color:black;border-radius:20px;height:30px"  (click)="openDialog()">Add a task</button>
   
  `
})
export class TaskAddButton {
   name = signal('');
   description = signal('');
   duedate = signal('');
   priorityLevel = signal('');
   id = signal("");
   status = signal("");
  @Output() addTask = new EventEmitter<Task>();
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormDialog, {
      data: {
        name: "",
        description: "",
        duedate: new Date(),
        priorityLevel: "low"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined && result.name !== '') {
        console.log(result);
        this.name.set(result.name);
        this.id.set(uuidv4());
        this.status.set("pending");
        this.description.set(result.description);
        this.duedate.set(result.duedate);
        this.priorityLevel.set(result.priorityLevel);
        console.log(this.duedate());
        this.addTask.emit({
          name: this.name(),
          id: this.id(),
          status: this.status(),
          description: this.description(),
          duedate: new Date(this.duedate()).toLocaleString(),
          priorityLevel: this.priorityLevel()
        })
      }
    });
  }
}




@Component({
  selector: 'task-add-form',
  providers: [provideNativeDateAdapter()],
  template: `
    <h2 mat-dialog-title>Add new Task</h2>
    <mat-dialog-content style="height:340px; width:440px">
      <div class="form" >
        <mat-form-field>
          <mat-label>Task Name</mat-label>
          <input matInput [(ngModel)]="data.name" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="data.description" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Choose a Due Date</mat-label>
          <input matInput [min]="minDate" [(ngModel)]="data.duedate" [matDatepicker]="picker" disabled/>
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker disabled="false"></mat-datepicker>
        </mat-form-field>

          <div style="display:flex; flex-direction: column;margin-top:15px">
            <label id="example-radio-group-label"><b>Set priority:</b> </label>
            <mat-radio-group
              aria-labelledby="example-radio-group-label"
              class="example-radio-group"
              [(ngModel)]="data.priorityLevel">
              @for (priority of priorityList; track priority) {
                <mat-radio-button [class]="priority+'-priority-button'" [id]="priority+'-priority-button'" [value]="priority">{{priority}}</mat-radio-button>
              }
            </mat-radio-group>
          </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="{name: data.name, description: data.description,duedate:data.duedate,priorityLevel:data.priorityLevel}" cdkFocusInitial>Add Task</button>
    </mat-dialog-actions>
    
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatRadioModule,
  ],
  styleUrl:'task-add-form.component.css'
})
export class TaskFormDialog {
  readonly dialogRef = inject(MatDialogRef<TaskFormDialog>);
  readonly data = inject<TaskData>(MAT_DIALOG_DATA);
  readonly minDate = new Date();
  priorityLevel: string = 'low';
  priorityList: string[] = ['low', 'medium', 'high'];

  onNoClick(): void {
    this.dialogRef.close();
  }
}
