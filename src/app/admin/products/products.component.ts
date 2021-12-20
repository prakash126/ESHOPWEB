import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  constructor(private ser:AdminService,private msgemit:EmitterService) {
    this.getCategory()
    this.getSubCategory()
    this.funGetSubSubcat()
    this.funGetBdata()
    this.funGetProductdata()
   }

   // change category
 
   funCatChange(){
  //  alert(this.drpcat)
   }

   // change subsubcategory
   drpsubcat:any;
   funSubCatChange(){
     //alert(this.drpsubcat)
   }


   drpsubsubcat:any;

  ngOnInit(): void {
    this.getCategory();
    this.getSubCategory();
    this.funGetSubSubcat();
    this.funGetProductdata();
  }

  data_category!:any;subcat_data:any;drpcat:any;
 
  getCategory(){
    if(this.ser.ser_cat_data == null){
      this.ser.serGetCategory().subscribe(dt=>{
        this.data_category = dt
        this.drpcat=this.data_category[0]._id;
      })
    }
    else{
      this.data_category = this.ser.ser_cat_data;
    }
  }

//getting data from subcat

getSubCategory(){
  if(this.ser.ser_subcat_data==null){
          this.ser.serGetSubCat().subscribe(dt=>{
            this.subcat_data=dt
           //  console.log(this.subcat_data)
             this.drpsubcat=this.subcat_data[0]._id
          })
        }
        else{
        this.subcat_data=this.ser.ser_subcat_data;
       }
}


  // Getting data from tbl_subsubcat
  subsubcat_data:any;
  funGetSubSubcat(){
    if(this.ser.ser_subsubcat_data==null){
           this.ser.serGetSubSubCat().subscribe((dt:any)=>{
             this.subsubcat_data=dt
             this.drpsubsubcat=this.subsubcat_data[0]._id
          
           })
         }
         else{
         this.subsubcat_data=this.ser.ser_subsubcat_data;
        }    
  }


  // getting data form brand table

  brand_data:any;drpbrand:any;
  funGetBdata(){
    if(this.ser.ser_brand_data==null){
      this.ser.serGetBrnddata().subscribe(dt=>{
        this.brand_data=dt
        //alert(this.data_category);
      })
    }
    else{
      this.brand_data=this.ser.ser_brand_data;
      //alert(this.data_category);
    }
  }

  //submiting images as well as data
  txtproduct:any;oldprice:any;newprice:any;quantity:any;txtarea:any;rating:any;offer:any;psize:any;pcolor:any;txtptype:any;
  funsubmit(){
    //alert("exec....");
      alert(this.drpsubsubcat);
    var obj={
      pname:this.txtproduct,catid:this.drpcat,subcatid:this.drpsubcat,subsubcatid:this.drpsubsubcat,brandid:this.drpbrand,pcolor:this.pcolor,
      oldprice:this.oldprice,newprice:this.newprice,quantity:this.quantity,description:this.txtarea,rating:this.rating,offer:this.offer,size:this.psize,ptype:this.txtptype
    }

    this.ser.serInsProduct(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result})
    //   var fid=<HTMLFormElement>document.getElementById("frm1")
    // fid.submit()
    this.funImgInsert();
    })
  }

  funImgInsert(){
    //alert("hi");
    var fid=<HTMLFormElement>document.getElementById("frm1")
    fid.submit()
  }

  // getting data from tbl_product
  product_data!:any;
  funGetProductdata(){
    if(this.ser.ser_product_data==null){
      this.ser.serGetProductdata().subscribe(dt=>{
        this.product_data=dt
        //alert(this.data_category);
      })
    }
    else{
      this.product_data=this.ser.ser_brand_data;
      //alert(this.data_category);
    }
  }
  obj=this.product_data;
  coldata=[
    // {headerName:"productid",field:"_id"},
    // {headerName:"CatId",field:"catid"},
    // {headerName:"subcatid",field:"subcatid"},
    // {headerName:"subsubcatid",field:"subsubcatid"},
    // {headerName:"brandid",field:"brandid"},
    {headerName:"Productname",field:"pname"},
    {headerName:"Oldprice",field:"oldprice"},
    {headerName:"Newprice",field:"newprice"},
    {headerName:"Qantity",field:"quantity"},
    {headerName:"Rating",field:"rating"},
    {headerName:"Offer",field:"offer"},
    {headerName:"Size",field:"size"}
  ]
}


// import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../admin.service';
// import {FormGroup, FormControl,Validators} from '@angular/forms';
// import { EmitterService } from 'src/app/emitter.service';


// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {

//   constructor(private ser:AdminService, private msgemit:EmitterService) {
//     this.getcategory()
//     this.getSubcategory()
//     this.getSubsubcategory()
//     this.getproduct()
//    }

//   //get cat data
//   data_category:any; drpcat:any;

//   getcategory(){
//     if(this.ser.ser_cat_data==null){
//     this.ser.serGetCategory().subscribe(dt=>{
//       this.data_category=dt
//       this.drpcat=this.data_category[0]._id
//     })
//   }
//   else{
//     this.data_category=this.ser.ser_cat_data
//   }
//   }

//   //get subcategory
//   subcat_data:any; drpsubcat:any;
//   getSubcategory(){
//     if(this.ser.ser_subcat_data==null){
//      this.ser.serGetSubcategory().subscribe(dt=>{
//        this.subcat_data=dt
//       //  console.log(this.subcat_data)
//         this.drpsubcat=this.subcat_data[0]._id
//      })
//    }
//    else{
//    this.subcat_data=this.ser.ser_subcat_data;
//   }
//  }

//  //function to get subsubdata 
//  subsubcat_data:any; drpsubsubcat:any;
// getSubsubcategory(){
//   if(this.ser.ser_subsubcat_data==null){
//     this.ser.serGetSubsubcategory().subscribe((dt:any)=>{
//       this.subsubcat_data=dt
//       this.drpsubsubcat=this.subsubcat_data[0]._id
    
//     })
//   }
//   else{
//   this.subsubcat_data=this.ser.ser_subsubcat_data;
//  }
// }

// pname:string;
//   // funsubmit(){
   

//   // }

//   product:FormGroup;
//   ngOnInit(): void {
//     this.getcategory();
//     this.getSubcategory();
//     this.getSubsubcategory();
   
//     this.product= new FormGroup({

//           productname:new FormControl("",[Validators.required]),
//           category:new FormControl("",[Validators.required]),
//           subcategory:new FormControl("",[Validators.required]),
//           subsubcategory:new FormControl("",[Validators.required]),
//           brand:new FormControl("",[Validators.required]),
//           color:new FormControl("",[Validators.required]),
//           rating:new FormControl("",[Validators.required]),
//           offer:new FormControl("",[Validators.required]),
//           newprice:new FormControl("",[Validators.required]),
//           oldprice:new FormControl("",[Validators.required]),
//           description:new FormControl("",[Validators.required]),
//          size:new FormControl("",[Validators.required]),
//          producttype: new FormControl("", [Validators.required]),
//           quantity:new FormControl("",[Validators.required]),
//           image:new FormControl("",[Validators.required])
         
          
//     })
//   }


//   funsubmit(){
//     // if(this.product.valid){
     

//         // var obj={pname:this.pname,catid:this.drpcat,subcatid:this.drpsubcat}
//         var fid=<HTMLFormElement>document.getElementById("frm1")
//         fid.submit()
    

//     var obj={
//       productname:this.product.controls.productname.value,
//       category:this.product.controls.category.value,
//       subcategory:this.product.controls.subcategory.value,
//       subsubcategory:this.product.controls.subsubcategory.value,
//      brand:this.product.controls.brand.value,
//      description:this.product.controls.description.value,
//      color:this.product.controls.color.value,
//      rating:this.product.controls.rating.value,
//      offer:this.product.controls.offer.value,
//      newprice:this.product.controls.newprice.value,
//      oldprice:this.product.controls.oldprice.value,
//      size:this.product.controls.size.value,
//      producttype:this.product.controls.producttype.value,
//      quantity:this.product.controls.quantity.value,
//      image:this.product.controls.image.value
     
//     }
     
   
  
// //      console.log(obj);   
// //  var fid=<HTMLFormElement>document.getElementById("frm1")
// //  fid.submit()
 
//  this.ser.serInsertProduct(obj).subscribe((dt:any)=>{
//    this.msgemit.mymessage_event.emit({message:dt.result});
//    console.log(obj);
//  })
//  console.log(this.product.value)
// }
//   // }

// //get data

// product_data:any; 
// getproduct(){
//   if(this.ser.ser_product_data==null){
//     this.ser.sergetproduct().subscribe((dt:any)=>{
//       this.product_data=dt
//       // alert(dt.result)
//     })
//   }
//   else{
//     this.product_data=this.ser.ser_product_data
//   }
// }




// //grid table
// rowData= this.product_data

// //cols data obj
// coldata=[
//   {headerName: "Productname", field:"productname",sortable:true,filter:true},
//   {headerName: "Category", field: "category",sortable:true,filter:true},
//   {headerName: "Subcategory", field: "subcategory",sortable:true,filter:true},
//   {headerName: "Subsubcategory", field: "subsubcategory",sortable:true,filter:true},
//   {headerName: "Brand", field: "brand",sortable:true,filter:true},
//   {headerName: "Description", field:"description",sortable:true,filter:true},
//   {headerName: "Color", field: "color",sortable:true,filter:true},
//   {headerName: "Rating", field:"rating",sortable:true,filter:true},
//   {headerName: "Offer", field: "offer",sortable:true,filter:true},
//   {headerName: "Newprice", field:"newprice",sortable:true,filter:true},
//   {headerName: "Oldprice", field: "oldprice",sortable:true,filter:true},
//   {headerName: "Size", field:"size",sortable:true,filter:true},
//   {headerName: "Producttype",field:"producttype",sortable:true,filter:true},
//   {headerName: "Quantity", field: "quantity",sortable:true,filter:true},
//   {headerName: "Image", field: "image",sortable:true,filter:true},
  
// ]






// }

