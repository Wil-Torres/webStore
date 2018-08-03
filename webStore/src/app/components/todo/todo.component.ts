import { Component, OnInit } from '@angular/core';
import { TodoService } from '../..//services/todo.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoListArray: any[];
  constructor( private todoService: TodoService) { }

  ngOnInit() {
    this,this.todoService.getTodoList().snapshotChanges().subscribe(item => {
      this.todoListArray = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.todoListArray.push(x)
      });
      this.todoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      })
    })
  }

  addTodo (itemList) {
    this.todoService.addTodo(itemList.value);
    itemList.value = null;
  }
  updateTodo($key: string, isChecked: boolean) {
    this.todoService.updateTodo($key, !isChecked)
  }
  removeTodo($key: string) {
    if ( confirm('Esta Seguro de eliminarlo')){
      this.todoService.removeTodo($key)  
    }
  }

}
