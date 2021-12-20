import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
    bs:any;
 currentmessage:any;
  constructor() {

    if(localStorage.getItem("product")){
      let lclData:any = localStorage.getItem('product')
      this.bs= new BehaviorSubject(JSON.parse(lclData).length);
    }
    else{
      this.bs=new BehaviorSubject(0);
    }
    this.currentmessage=this.bs.asObservable();
    
   
   }
  
   funnext(current_value:any){
      
      this.bs.next(current_value);
   }
}
