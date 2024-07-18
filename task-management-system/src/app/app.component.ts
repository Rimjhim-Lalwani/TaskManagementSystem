import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {todo} from 'task/task-form.component.html'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management-system';
}
