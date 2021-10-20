import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/item.model';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-new-to-do',
  templateUrl: './new-to-do.component.html',
  styleUrls: ['./new-to-do.component.css'],
})
export class NewToDoComponent implements OnInit {
  categories: any = [];
  constructor(private tdSc: ToDoService) {
    this.categories = [
      { name: 'Work', code: 'Work' },
      { name: 'Sport', code: 'Sport' },
      { name: 'Groceries', code: 'Groceries' },
      { name: 'Personnel', code: 'Personnel' },
    ];
  }
  addItem(f: NgForm) {
    const addedItem = new Item(
      f.value.name,
      new Date(),
      false,
      '',
      f.value.category.name
    );
    this.tdSc.addItemToList(addedItem);
  }
  ngOnInit(): void {}
}
