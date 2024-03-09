import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterBystatus = '';
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {
    this.initializeForm();
  }
  initializeForm() {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getAllTodos();
  }
  getAllTodos() {
    this.todoService.getAllTodos(this.filterBystatus).subscribe({
      next: (response) => {
        this.todos = response.data;
      },
    });
  }
  openSlidePanel(fromAdd: boolean) {
    this.isSlidePanelOpen = true;
    if (fromAdd) {
      this.todoId = null;
    }
  }
  onFilterByStatus(status: string) {
    this.filterBystatus = status;
    this.getAllTodos();
  }
  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.initializeForm();
  }
  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) {
        this.todoService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.toastService.success('Updated Successfully !');
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.toastService.success('Saved Successfully !');
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITodo) {
    this.todoId = item.id!!;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel(false);
  }
}
