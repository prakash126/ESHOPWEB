import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {
  subcat_data:any;subsubcat_data:any;
  drpsubsubcat:any;txtsubsubcat:any;

  // for pagenation 
  cp:number=1;
  constructor(private ser:AdminService,private msgemit:EmitterService) {
    if(this.ser.ser_subcat_data == null){
      this.ser.serGetSubCat().subscribe(dt=>{
        this.subcat_data = dt;
        
      })
    }
    else{
      this.subcat_data = this.ser.ser_subcat_data;
    }
    // for subcategory data
    this.funGetSubSubcat();
   }

  ngOnInit(): void {
  }

  // Inserting data into tbl_subsubcat
  funInsSubsubcat(){
    var obj = {subsubcatname:this.txtsubsubcat,active:1,subcatid:this.drpsubsubcat}
    // alert(obj.subsubcatname);
    this.ser.serInsertSubSubCat(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result});
      this.ser.ser_subsubcat_data = null;
      this.txtsubsubcat = '',
      this.drpsubsubcat = '',
      this.funGetSubSubcat();
    })
  }

  // Getting data from tbl_subsubcat
  funGetSubSubcat(){
    if(this.ser.ser_subsubcat_data == null){
      this.ser.serGetSubSubCat().subscribe(dt=>{
        this.subsubcat_data = dt;
        
      })
    }
    else{
      this.subsubcat_data = this.ser.ser_subsubcat_data;
    }
  }

  // Update data into tbl_subsubcat
  temp:any=0;tsubsubcatname:any;drpsubsubcat2:any;
  funEditSubSubcat(subsubcatdata:any){
    //alert("update fun called")
    this.temp=subsubcatdata._id;
    this.tsubsubcatname=subsubcatdata.subsubcatname;
    this.drpsubsubcat2=subsubcatdata.subcatid;
  }

  //Updating data and sending it into admin.service.ts

  funSave(){
    var obj = {id:this.temp,subsubcatname:this.tsubsubcatname,subcatid:this.drpsubsubcat2}
    // this.ser.serUpdateSubSubcategory(obj).subscribe((dt:any)=>{
    //   alert(dt.result);
    //   this.temp=0;
    //   this.ser.ser_subsubcat_data=null;
    //   this.funGetSubSubcat();
    // });
    this.ser.serUpdateSubSubcategory(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result});
      this.temp=0;
      this.ser.ser_subsubcat_data=null;
     
      this.funGetSubSubcat();
    });
  }
  
  }

