import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  dataSubject = new BehaviorSubject<Item[]>([]);
  dataSusbscrition: Subscription;
  data: any;
  constructor(private http: HttpClient) {}

  getList() {
    if (JSON.parse(localStorage.getItem('todos'))) {
      this.data = JSON.parse(localStorage.getItem('todos'));
      this.dataSubject.next(this.data);
    } else {
      this.dataSusbscrition = this.http
        .get<Item[]>('https://60d8582ca376360017f45fe2.mockapi.io/todos')
        .subscribe((data) => {
          console.log(JSON.parse(localStorage.getItem('todos')));
          this.data = data;
          this.dataSubject.next(data);
          localStorage.setItem('todos', JSON.stringify(data));
        });
    }
  }
  addItemToList(item: Item) {
    this.data = [...this.data, item];
    localStorage.setItem('todos', JSON.stringify(this.data));
    this.dataSubject.next(this.data);
  }
  removeItemFromList(item: Item) {
    let index = this.data.findIndex(
      (i) => i.creationDate === item.creationDate
    );
    this.data.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.data));
    this.dataSubject.next(this.data);
  }
  changeCompletedTodos(item: Item) {
    let index = this.data.findIndex(
      (i) => i.creationDate === item.creationDate
    );
    let newData = this.data.slice();
    newData[index].completed = item.completed;
    localStorage.setItem('todos', JSON.stringify(newData));
    this.dataSubject.next(newData);
  }
  editMade(item) {
    let index = this.data.findIndex(
      (i) => i.creationDate === item.creationDate
    );
    let newData = this.data.slice();
    newData[index].title = item.title;
    localStorage.setItem('todos', JSON.stringify(newData));
    this.dataSubject.next(newData);
  }
}
