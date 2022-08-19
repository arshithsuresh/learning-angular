import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  task_arr: Task[]=[];

  addTaskValue : string='';
  
  constructor(private curdService: CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.task_arr = []
    this.getAllTask();
  }
  getAllTask(){
    this.curdService.getAllTask().subscribe({
      next: (tasks)=>{
        this.task_arr = tasks;        
      },      
      error: (err)=>alert("Error Occured - Get All Task")
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.id = this.task_arr.length+1;
    this.curdService.addTask(this.taskObj).subscribe(
      {
        complete:()=>{
          this.ngOnInit();
          this.addTaskValue='';
        },
        error:(err)=>{
          alert("Error Occured - Add Task");
          console.log(err.stack)
        } 
      }
    );
  }
  
  getEditPlaceholder(task:Task){
    this.taskObj.task_name = task.task_name;
    this.taskObj.id = task.id
  }
  changedText(val?:any)
  {
    this.taskObj.task_name = val.target.value;    
  }
  editTask(){
    
    this.curdService.editTask(this.taskObj).subscribe({complete:()=>{this.ngOnInit()}, error:(err)=>{
      console.log("Error Occured - Edit Task")}
    })
  }

  deleteTask(task:Task){
    this.curdService.deleteTask(task).subscribe({
      complete:()=>this.ngOnInit(),
      error:(err)=>alert("Error Occured - Delete Task")
    })
  }

}
