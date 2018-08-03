import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

// agregar metodos de tareas, actualizarlas, borrarlas, etc.
export class TodoService {

  todoList: AngularFireList<any>;

  constructor( private firebasedb: AngularFireDatabase) { }
  getTodoList(){
    this.todoList = this.firebasedb.list('titles');
    return this.todoList;

  }
  addTodo(title: string){
    this.todoList.push({
      title: title,
      isChecked: false
    })

  }
  updateTodo($key: string, flag: boolean){
    this.todoList.update($key, {isChecked: flag});
  }
  removeTodo($key){
    this.todoList.remove($key);

  }
}
