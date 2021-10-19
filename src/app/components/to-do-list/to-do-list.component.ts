import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoService } from '../../to-do.service';
import { Item } from '../../item.model';
import { MenuItem } from 'primeng/api';
import { map, tap, filter } from 'rxjs/operators';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  list: Item[] = [];
  value: boolean = true;
  completedFilter = false;
  categories: MenuItem[];
  editing: boolean[];
  activeItem: MenuItem;
  @ViewChild('p-tabMenu') menu: MenuItem[] = [];
  constructor(private tdSc: ToDoService) {
    this.categories = [
      { label: 'All' },
      { label: 'Work' },
      { label: 'Personel' },
      { label: 'Groceries' },
      { label: 'Sport' },
    ];
    this.activeItem = this.categories[0];
  }

  ngOnInit(): void {
    this.activeItem = this.categories[0];

    this.tdSc.dataSubject
      .pipe(
        map((v) => this.filter(v)),
        tap((data) => {
          this.editing = Array.from(
            { length: data.length },
            (i) => (i = false)
          );
        })
      )
      .subscribe((data) => {
        this.list = data;
      });
  }

  markAsCompleted(completed: boolean, index: number) {
    let selectedItem = null;
    let newList = this.list.map((item, i) => {
      if (i === index) {
        item.completed = completed;

        selectedItem = item;
      }
      return item;
    });

    this.tdSc.changeCompletedTodos(selectedItem);
  }
  filter(data: Item[]): Item[] {
    let filteredList: Item[] = [];

    if (this.completedFilter) {
      if (this.activeItem.label !== 'All')
        filteredList = data.filter(
          (item) =>
            !item.completed && item.category + '' === this.activeItem.label
        );
      else filteredList = data.filter((item) => !item.completed);
    } else {
      if (this.activeItem.label !== 'All') {
        filteredList = data.filter(
          (i) => i.category + '' === this.activeItem.label
        );
      } else {
        filteredList = data;
      }
    }
    return filteredList;
  }

  filterOnActive(menuItems) {
    this.activeItem = menuItems['activeItem'];
    this.tdSc.dataSubject.pipe(map((v) => this.filter(v))).subscribe((data) => {
      this.list = data;
    });
  }
  filterOnShowComplted() {
    this.tdSc.dataSubject.pipe(map((v) => this.filter(v))).subscribe((data) => {
      this.list = data;
    });
  }
  onRemoveItem(index: number, item) {
    this.tdSc.removeItemFromList(item);
  }

  makeItEditable(index: number) {
    console.log(this.editing);

    this.editing = this.editing.map((e, i) => {
      if (i === index) return true;
      return false;
    });
  }
  editTodo(e, index) {
    let selectedItem = null;

    let newList = this.list.map((item, i) => {
      if (i === index) {
        item.title = e.target.value;
        selectedItem = item;
      }
      return item;
    });
    this.tdSc.editMade(selectedItem);
    this.editing.map((e, i) => i == index);
  }
}
