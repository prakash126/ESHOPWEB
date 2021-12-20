import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
temp:any = 0;cp:number=1;
  constructor(private ser:AdminService,private msgemit:EmitterService) { 
    this.getCategory();
  }

  ngOnInit(): void {
  }

  data_category : any;
  txtcat: any;

  getCategory(){
    if(this.ser.ser_cat_data == null){
      this.ser.serGetCategory().subscribe(dt=>{
        this.data_category = dt;
      })
    }
    else{
      this.data_category = this.ser.ser_cat_data;
    }
  }

  // Function to insert category

  funInsCat(){
    var obj={catname:this.txtcat,active:1}
    console.log(obj)
    this.ser.serInsertCat(obj).subscribe((dt:any)=>{
     this.msgemit.mymessageevent.emit({message:dt.result})
      this.ser.ser_cat_data=null;
      this.txtcat = ''
      this.getCategory()
    })

  }

  //Function to update data in category table
  txtcatnew:any;drpactive:any;

  funUpdate(cat_data:any){
    // alert(cat_data._id)
    // alert(cat_data.catname)
    // alert(cat_data.active)
    this.temp = cat_data._id;
    this.txtcatnew = cat_data.catname;
    this.drpactive = cat_data.active
  }
      // sending data to admin.service.ts and consume its response send by server
          funCatsave(){
            //alert("HI");
            var obj = {id:this.temp,catname:this.txtcatnew,active:this.drpactive}
            this.ser.serUpdateCategory(obj).subscribe((dt:any)=>{
              this.msgemit.mymessageevent.emit({message:dt.result})
                this.temp=0;
                this.ser.ser_cat_data=null;
                this.getCategory();
            });
          }
}
