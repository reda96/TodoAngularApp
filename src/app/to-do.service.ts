import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from "./item.model";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
   dataSubject= new Subject<Item[]>();
   data:any ;
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Item[]>("https://60d8582ca376360017f45fe2.mockapi.io/todos").subscribe(
     data=> {
      localStorage.setItem('todos',  JSON.stringify(data));
       this.data = data;
       this.dataSubject.next(data)}
    )

    
    
  }
  addItemToList(item:Item){
    this.data = [...this.data, item];
    localStorage.setItem('todos',  JSON.stringify(this.data));
    this.dataSubject.next(this.data)

  }
  removeItemFromList(index:number){
    localStorage.setItem('todos',  JSON.stringify(this.data));
    this.data.splice(index, 1);
     this.dataSubject.next(this.data)

  }
}
