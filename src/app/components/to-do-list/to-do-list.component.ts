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
  listObs$ = this.tdSc.list$.pipe(
    tap((data) => {
      this.editing = Array.from({ length: data.length }, (i) => (i = false));
    })
  );

  value: boolean = true;
  completedFilter = false;
  categories: MenuItem[];
  editing: boolean[];

  constructor(private tdSc: ToDoService) {
    this.categories = [
      { label: 'All' },
      { label: 'Work' },
      { label: 'Personel' },
      { label: 'Groceries' },
      { label: 'Sport' },
    ];
  }

  ngOnInit(): void {}

  markAsCompleted(data: Item[], index: number, completed: boolean) {
    let selectedItem = data.find((d, i) => i === index);
    this.tdSc.changeCompletedTodos(selectedItem, completed);
  }

  onRemoveItem(index: number, item) {
    this.tdSc.removeItemFromList(item);
  }

  makeItEditable(index: number) {
    this.editing = this.editing.map((e, i) => {
      if (i === index) return true;
      return false;
    });
  }
  editTodo(e, item, index) {
    item.title = e.target.value;
    this.tdSc.editMade(item);
    this.editing.map((e, i) => i == index);
  }
}
