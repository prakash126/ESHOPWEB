import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  cat_data:any;subcat_data:any;txtsubcat:any;drpcat:any;
  //for pagenation
  cp:number=1;
  constructor(private ser:AdminService,private msgemit:EmitterService) { 
    if(this.ser.ser_cat_data == null){
      this.ser.serGetCategory().subscribe(dt=>{
        this.cat_data = dt;
        
      })
    }
    else{
      this.cat_data = this.ser.ser_cat_data;
    }

    // for subcategory data
    this.getSubCategory();
  }

  ngOnInit(): void {
  }

  // getting data of subcategory

  getSubCategory(){
    if(this.ser.ser_subcat_data == null){
      this.ser.serGetSubCat().subscribe(dt=>{
        this.subcat_data = dt;
        
      })
    }
    else{
      this.subcat_data = this.ser.ser_subcat_data;
    }
  }

// Inserting subcategory Data

funInsSubcat(){
  var obj = {subcatname:this.txtsubcat,active:1,catid:this.drpcat}
  console.log(obj)
  this.ser.serInsertSubCat(obj).subscribe((dt:any)=>{
    this.msgemit.mymessageevent.emit({message:dt.result})
    this.ser.ser_subcat_data=null
    this.txtsubcat = '',
    this.drpcat = ''
    this.getSubCategory();
  })
}
//update data in subcat

temp:number = 0;tsubcat:any;drpcat2:any;
funEditSubcat(obj:any){
  //alert("hi");
  this.temp=obj._id;
  this.tsubcat = obj.subcatname
  this.drpcat2  = obj.catid
}
// send data to the server
funSave(){
  //alert("hi");
  var obj = {id:this.temp,subcatname:this.tsubcat,catid:this.drpcat2}
  // alert(obj.subcatname);
  // alert(obj.catid)
  this.ser.serUpdateSubcategory(obj).subscribe((dt:any)=>{
    this.msgemit.mymessageevent.emit({message:dt.result})
    this.temp=0;
    this.ser.ser_subcat_data=null;
    this.getSubCategory();
  });
}
}
