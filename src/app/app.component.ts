import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'toDoApp';
  remaining = 0;
  constructor(private tdSc: ToDoService) {}
  ngOnInit(): void {
    this.tdSc.getList();
    this.tdSc.dataSubject.subscribe((data) => {
      console.log(data);

      this.remaining = data.filter((item) => !item.completed).length;
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  ngOnDestroy() {
    this.tdSc.dataSusbscrition.unsubscribe();
  }
}
