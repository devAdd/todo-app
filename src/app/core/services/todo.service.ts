import { Injectable } from '@angular/core';
import { IResponse, ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(status: string): Observable<IResponse<ITodo[]>> {
    return this.http.get<IResponse<ITodo[]>>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}?status=${status}`
    );
  }
  addTodo(data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.post<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }
  updateTodo(id: number, data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.put<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
      data
    );
  }
}
