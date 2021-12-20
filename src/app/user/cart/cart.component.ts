import { Component, OnInit } from '@angular/core';
import { UseremitterService } from 'src/app/useremitter.service';
//import $ from "jquery"
import { CartItemsService } from '../cart-items.service';
import { UserService } from '../user.service';
import decode from "jwt-decode";

import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  data:any;emptycart:any;currentcart_val!:number;
  constructor(private myeventobj:UseremitterService,private cartitemSer:CartItemsService,private userser:UserService,private rt : Router) {

    // cartitems releted

    this.cartitemSer.currentmessage.subscribe((dt:any)=>{
      this.currentcart_val=dt;
    })

    if(localStorage.getItem('aut')){
      this.fun1();
    }
    else{
      var lclData:any = localStorage.getItem('product');
      this.data =JSON.parse(lclData);
      //alert(typeof(this.data));
      this.funTotal();
    }
    
    
     }

  ngOnInit(): void {
    
  }
  
  total:any=0;
  fun1(){
   
      //alert("hi")
     
      this.userser.ser_getcart_data().subscribe((dt:any)=>{
        this.data = (dt);
       // alert(typeof(this.data))
        if(this.data.length === 0){
          this.emptycart = 0;
          this.showcart()
        }else{
          for(var i=0;i<this.data.length;i++){
            //alert(this.data[i].uqty)
            this.total=this.total + this.data[i].newprice * this.data[i].uqty;
            //alert(this.total)
          }

        }
       // alert(this.total)
      })
    
    
    
  }

 
  funTotal(){
    this.total=0;
    for(var i=0;i<this.data.length;i++){
      //alert(this.data[i].newprice)
      this.total=this.total+this.data[i].newprice*this.data[i].uqty;
    }
  }

   showcart(){
    //alert(JSON.parse(localStorage.getItem("product")).length)
    if(localStorage.getItem("aut")){
      if(this.data.length === 0){
       // alert("hi")
        this.emptycart = 0;
      }
    }else{

      var lclData:any = localStorage.getItem('product');
      if(JSON.parse(lclData).length==0){
        
        this.emptycart=0;
      }
    }
   }

   funRemoveItem(index:any,dt:any){
    //alert(index)
    if(localStorage.getItem("aut")){
      //alert("hi")
       this.userser.deletecartdata(dt._id).subscribe(res=>{
         //alert("data deleted")
         this.funTotal();
         this.fun1();
         //  if(this.currentcart_val>0){
           //   this.currentcart_val--;
           //   this.cartitemSer.funnext(this.currentcart_val);
           //  }
           this.showcart();
           this.currentcart_val--;
           this.cartitemSer.funnext(this.currentcart_val);
      })
    }else{
      this.data.splice(index,1);
      //alert(JSON.stringify(localStorage.getItem("product")))
      localStorage.setItem("product",JSON.stringify(this.data));
      this.funTotal();
      //  if(this.currentcart_val>0){
      //   this.currentcart_val--;
      //   this.cartitemSer.funnext(this.currentcart_val);
      //  }
      this.showcart();
      this.currentcart_val--;
      this.cartitemSer.funnext(this.currentcart_val);
    }
    
    
  }
  qytExceeds:any;qytbelow:any;
  funup(indx:any) {
    var conid = 'txt' + indx;
    //alert(indx)
    var con = <HTMLInputElement>document.getElementById(conid);
    var cval: any = con.value;
    if(cval<this.data[indx].quantity){
      cval++;
      
    }
    else{
      //alert("no more qty exceeds")
      $("#strong"+indx).show(10).delay(3000).hide(10);
    }
    con.value = cval;
    this.data[indx].uqty=cval;
    localStorage.setItem("product",JSON.stringify(this.data));
    this.funTotal();
  }
  fundown(indx:any) {
    var conid = 'txt' + indx;
    var con = <HTMLInputElement>document.getElementById(conid);
    var cval: any = con.value;
    if (cval != 1) cval--;
    if(cval==1){
      this.qytbelow=1;
    }
    con.value = cval;
    this.data[indx].uqty=cval;
    localStorage.setItem("product",JSON.stringify(this.data));
    this.funTotal();
  }

  //proceed to pay
  funProceedToPay(){
    if(localStorage.getItem('aut')){
      //this.rt.navigateByUrl('us/cart')
      var lclData:any = localStorage.getItem('tok');
      var data:any = decode(lclData)
      //alert(data.email)
      this.userser.ser_payment({uid:data.userid}).subscribe((dt:any)=>{
        //alert(dt);
        window.location = dt.url;
      })
    }
    else{
      this.myeventobj.myevent.emit();
    }
  }

}
