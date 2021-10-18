import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToDoService } from "../../to-do.service";
import { Item } from "../../item.model";
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  list: Item[] = []
  filteredList: Item[] = []
  value: boolean = true
  completedFilter = false
  categories: MenuItem[] ;
  activeItem: MenuItem;
  @ViewChild('menuItems') menu: MenuItem[]=[];
  constructor(private tdSc: ToDoService) {
    this.categories =[{label:"All",
  }, 
  {label: "Work",}, 
  {label: "Personel",} ,{label:"Groceries"}]
   this.activeItem = this.categories[0];
   }

  ngOnInit(): void {   this.activeItem = this.categories[0];
      this.tdSc.dataSubject.subscribe(data=>{
          this.list = data; 
         
          this.filteredList=data;
         this.filter()
      })
     
  }
  ngOnDestroy(){
    this.tdSc.dataSubject.unsubscribe()
    localStorage.removeItem('todos')
  }

 
  markAsCompleted(completed:boolean,index:number){
   
      if(completed){
        this.list = this.list.map((item, i) => {
          if(i === index) item.completed = true
          return item
        }
        
        )
    }
  }
  filter(){
    this.activeItem = this.menu['activeItem'];
    if(this.completedFilter){

      if(this.activeItem.label !==  "All")
        this.filteredList = this.list.filter(item =>!item.completed &&item.category + "" === this.activeItem.label)
      else this.filteredList = this.list.filter(item =>!item.completed ); 
  } else{
      
      if(this.activeItem.label !== "All"){        
      this.filteredList  =  this.list.filter(i=>i.category + "" === this.activeItem.label)
     }
      else  this.filteredList = this.list;
 }
 //this.tdSc.dataSubject.next(this.filteredList)
  }
  onRemoveItem(index:number, item:MenuItem){
    this.tdSc.removeItemFromList(this.list.findIndex((i)=> i.creationDate===i.creationDate ))
   
  }
}
