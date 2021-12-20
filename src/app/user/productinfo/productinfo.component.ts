import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { UserService } from '../user.service';
import {Router} from "@angular/router"
import { CartItemsService } from '../cart-items.service';
import decode from "jwt-decode";


@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {
  product_id:any;
  product_info:any;
  imgbig:any;
  alloffers:any;
  bdid:any;
  current_val!:number;
  constructor(private rtt:Router,private rt:ActivatedRoute,private userser:UserService,private cartService:CartItemsService) { 
    

      //releted to cart value
      this.cartService.currentmessage.subscribe((dt:any)=>{
        //alert(dt)
        this.current_val=dt;
      })


      this.rt.params.subscribe(dt=>{
      this.product_id=dt.productid
      this.userser.ser_get_productinfo_productid({productid:this.product_id})
      .subscribe((dt:any)=>{
        
        this.product_info=dt;
        this.imgbig=dt[0].pimage[0];
        //this.alloffers=dt[0].offer.split(",");
        this.alloffers=dt[0].offer.split(",");
        //alert(this.alloffers)
        this.bdid=dt[0].brandid;
        this.funGetBname();
     })
     })
  }

  ngOnInit(): void {
  }
  bdata:any;bname:any
  funGetBname(){
    this.userser.ser_get_productbname_brandid({brandid:this.bdid}).subscribe((dt:any)=>{
      this.bdata=dt;
      
      for(var i = 0;i<this.bdata.length;i++){
        if(this.bdid == dt[i].branddata._id){
          // alert(dt[i].branddata.bname)
          this.bname=dt[i].branddata.bname;
        }
      }
    })
  }

  funAddToCart(prod:any) {
    // alert(prod._id)
    if(localStorage.getItem("aut")){
      //alert("LOGIDED IN")
      let lclData:any =localStorage.getItem('tok');
      var tokendata:any = decode(lclData)
      // alert(tokendata.userid)
      var obj={
        userid:tokendata.userid,
        productdata:prod
      }
      //console.log("obj "+{prod})
      this.userser.ser_getcart_data_byuserid(obj.userid,obj.productdata._id).subscribe((res:any)=>{
        //console.log(res)
        if(res.length>0){
          let cartuqty = res[0].uqty;
          let cartid = res[0]._id;
          cartuqty = cartuqty + 1;
          console.log({cartuqty})
          this.userser.ser_update_cart_qty(cartid,cartuqty).subscribe(dt=>{
            console.log("uqty updated!");
            this.rtt.navigateByUrl('us/cart');
          })
        }else{
          //alert("hi")
          this.userser.ser_send_prodcart_data(obj).subscribe((dt:any)=>{
            this.current_val++;
            this.cartService.funnext(this.current_val);
            //alert(dt.result);
            this.rtt.navigateByUrl('us/cart');
            //var ulr = "http:"+//localhost:4200/us/cart
          
            
          })
        }
      })
      // this.userser.ser_send_prodcart_data(obj).subscribe((dt:any)=>{
      //   this.current_val++;
      //   this.cartService.funnext(this.current_val);
      //   //alert(dt.result);
        
        
      // })
      // this.rtt.navigateByUrl('us/cart');
      //var ulr = "http:"+//localhost:4200/us/cart
      
      
    }
    else{
      
    var arr: any[] = [];
    if (localStorage.getItem('product')) {
      var exist = 0;
      var all_products:any = localStorage.getItem('product');
      // console.log(all_products)
      var objects = JSON.parse(all_products);
      for (let i = 0; i < objects.length; i++) {
        if (objects[i]._id == prod._id) {
          objects[i].uqty = objects[i].uqty + 1;
          exist++;
        }
      }
      if (exist == 0) {
        prod.uqty = 1;
        objects.push(prod);
        this.current_val++;
        this.cartService.funnext(this.current_val);
      }
      // alert(objects.length)
      localStorage.setItem('product', JSON.stringify(objects));
      this.rtt.navigateByUrl('us/cart');
    } else {
      prod.uqty = 1;
      var str = prod;
      arr.push(str);
      localStorage.setItem('product', JSON.stringify(arr));
      this.current_val++;
      this.cartService.funnext(this.current_val);
      this.rtt.navigateByUrl('us/cart');
    }
    }
      
  }


  
}
