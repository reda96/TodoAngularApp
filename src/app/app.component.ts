import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from './to-do.service';
import { map } from 'rxjs/operators';
import { Item } from './item.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'toDoApp';

  listObs$ = this.tdSc.list$.pipe(
    map((todos) => {
      return todos.filter((x) => !x.completed);
    })
  );
  constructor(private tdSc: ToDoService) {}
  ngOnInit(): void {}
  ngOnDestroy() {}
}
