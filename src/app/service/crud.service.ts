import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }

  addTask(_task:Task) : Observable<Task>
  {
    return this.http.post<Task>(this.serviceURL, _task);
  }

  getAllTask() : Observable<Task[]>
  {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(_task:Task) : Observable<Task>
  {
    return this.http.delete<Task>(this.serviceURL+`/`+_task.id);
  }

  editTask(_task:Task) : Observable<Task>
  {
    return this.http.put<Task>(this.serviceURL+'/'+_task.id, _task);
  }

}
