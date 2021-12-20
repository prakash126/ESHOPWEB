import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
txtbname:any;temp:any = 0;cp:number=1;
  constructor(private ser:AdminService,private msgemit:EmitterService) {
    this.funGetBdata();
   }

  ngOnInit(): void {
  }

  funInsBrand(){
    var obj={bname:this.txtbname,active:1}
    //alert(obj);
    this.ser.serInsBrand(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result})
      this.ser.ser_brand_data=null;
      this.txtbname = '';
      this.funGetBdata();
    })
  }

  data_category:any;
  funGetBdata(){
    if(this.ser.ser_brand_data==null){
      this.ser.serGetBrnddata().subscribe(dt=>{
        this.data_category=dt
        //alert(this.data_category);
      })
    }
    else{
      this.data_category=this.ser.ser_brand_data;
      //alert(this.data_category);
    }
  }
 //Function to update data in category table
 txtbdatanew:any;drpactive:any;

 funUpdate(bdata:any){
   // alert(bdata._id)
   // alert(bdata.bname)
   // alert(bdata.active)
   this.temp = bdata._id;
   this.txtbdatanew = bdata.bname;
   this.drpactive = bdata.active;
 }
     // sending data to admin.service.ts and consume its response send by server
         funBrandsave(){
           //alert("HI");
           var obj = {id:this.temp,bname:this.txtbdatanew,active:this.drpactive}
           this.ser.serUpdateBrand(obj).subscribe((dt:any)=>{
             this.msgemit.mymessageevent.emit({message:dt.result})
               this.temp=0;
               this.ser.ser_brand_data=null;
               this.funGetBdata();
           });
         }
}
