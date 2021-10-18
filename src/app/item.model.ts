export class Item {
    
    constructor(public title:String,
         public creationDate: Date,public completed:boolean, public description?:String,
         public category?: CATEGORY_TYPE ){
        
             
         }

        }
enum CATEGORY_TYPE {
    Work="Work",
    Personel="Personel",
    Sport="Sport"

}