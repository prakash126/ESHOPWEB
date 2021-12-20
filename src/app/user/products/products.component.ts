import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { UserService } from '../user.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subsub_catid:any;products_data:any;slider_val:number=1;min_val!:number;max_val!:number;
  constructor(private rt:ActivatedRoute,private userser:UserService) {
    
    this.rt.params.subscribe(dt=>{
     this.subsub_catid=dt.subsubid
     this.userser.ser_get_product_subsubid({subsubcatid:this.subsub_catid})
     .subscribe((dt:any)=>{
       console.log({dt})
      for(var i=0;i<dt.length;i++)
      {
        var arr=[]
        var half=0
        for(var j=1;j<=dt[i].rating;j++)
        {
         arr.push(j)
        }
        j--
        if(dt[i].rating > j)
        half=1
        dt[i].ratingarr=arr
        dt[i].half=half
      }
      this.products_data=(dt)
    })
    })
   }

  ngOnInit(): void {
  }

  funslider(){
   // alert(this.slider_val);
    this.userser.ser_getproduct_sliderminmax({subsubcatid:this.subsub_catid,slider_value:this.slider_val}).subscribe((dt:any)=>{
      this.products_data=dt;
      //alert("hi")
      this.min_val=dt[0].newprice;
      this.max_val=dt[dt.length-1].newprice;
      // alert(this.max_val)
      // alert(this.min_val)
    })
  }

}
