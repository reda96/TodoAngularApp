import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ToDoService implements OnInit {
  private list = new BehaviorSubject<Item[]>([]);

  private data: Item[] = [];
  constructor(private http: HttpClient) {
    if (JSON.parse(localStorage.getItem('todos'))) {
      this.list.next(JSON.parse(localStorage.getItem('todos')));
    } else {
      this.http
        .get<Item[]>('https://60d8582ca376360017f45fe2.mockapi.io/todos')
        .pipe(
          take(1),
          tap((data) => {
            this.list.next(data);
            localStorage.setItem('todos', JSON.stringify(data));
          })
        )
        .subscribe();
    }
  }
  ngOnInit(): void {}

  get list$() {
    return this.list.asObservable();
  }
  addItemToList(item: Item) {
    const newList = this.list.value;
    newList.push(item);
    this.list.next([...newList]);
    localStorage.setItem('todos', JSON.stringify(newList));
  }
  removeItemFromList(item: Item) {
    const pList = this.list.value;
    let index = pList.findIndex((i) => i.creationDate === item.creationDate);
    pList.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(pList));
    this.list.next(pList);
  }
  changeCompletedTodos(item: Item, completed: boolean) {
    const pList = this.list.value;
    let index = pList.findIndex((i) => i.creationDate === item.creationDate);
    pList[index].completed = completed;
    localStorage.setItem('todos', JSON.stringify(pList));
    this.list.next(pList);
  }
  editMade(item) {
    let newList = this.list.value.map((i) => {
      if (i.creationDate === item.creationDate) return item;
      return i;
    });

    localStorage.setItem('todos', JSON.stringify(newList));
    this.list.next(newList);
  }
}
