import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Settings } from '../settings';
import {map} from 'rxjs/operators';
import { pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  settings:any;
  ser_cat_data:any;
  
login_check:boolean=false;
  constructor(private http:HttpClient) { 
    this.settings = new Settings();
    if(localStorage.getItem("adminaut")){
      this.login_check=true;
    }
  }


  serGetCategory(){
   // alert("Admin service called")
    return this.http.get(`${this.settings.server_path}/catpath/getCategory`).pipe(map(dt=>{
      this.ser_cat_data = dt;
      return dt;
    }));
  }

  serInsertCat(catdata:any){
    return this.http.post(`${this.settings.server_path}/catpath/insertCategory`,catdata)
   }


   // Updating data to backend
   serUpdateCategory(obj:any){
     return this.http.put(`${this.settings.server_path}/catpath/updateCategory`,obj);
   }



   //  subcategory  code starts
   ser_subcat_data:any
   serGetSubCat(){
     return this.http.get(`${this.settings.server_path}/subcatpath/getsubcat`).pipe(map(dt=>{
       this.ser_subcat_data = dt;
       return dt;
     }))
   }

   // Inserting Data in subcategory

   serInsertSubCat(subcat:any){
    return this.http.post(`${this.settings.server_path}/subcatpath/inssubcat`,subcat);
   }

   // Updating data into subcategory
   serUpdateSubcategory(obj:any){
    return this.http.put(`${this.settings.server_path}/subcatpath/updateSubcategory`,obj);
  }

//Work on subsubcat data

  //Inserting data into subsubcategory
  serInsertSubSubCat(subsubcatdata:any){
    return this.http.post(`${this.settings.server_path}/subsubcatpath/insSubSubcat`,subsubcatdata);
  }

  // getting data from subsubcat
  ser_subsubcat_data:any;
  serGetSubSubCat(){
    return this.http.get(`${this.settings.server_path}/subsubcatpath/getSubSubCategoryData`).pipe(map(dt=>{
      this.ser_subsubcat_data=dt;
      return dt;
     }));
  }
  // udate data into data bases tbl_subsubcat
  serUpdateSubSubcategory(obj:any){
    return this.http.put(`${this.settings.server_path}/subsubcatpath/updateSubSubcategory`,obj);
  }

  // Login table

  serAuth(obj:any){
    return this.http.post(`${this.settings.server_path}/authpath/chklogin`,obj); 
  }

  // Brand Table
 
  serInsBrand(bdata:any){
    return this.http.post(`${this.settings.server_path}/brandpath/insertBrand`,bdata);
  }
  ser_brand_data:any;
  serGetBrnddata(){
    return this.http.get(`${this.settings.server_path}/brandpath/getbdata`).pipe(map(dt=>{
      this.ser_brand_data = dt;
      return dt;
    }))
  }

  serUpdateBrand(obj:any){
    return this.http.put(`${this.settings.server_path}/brandpath/upbranddata`,obj);
  }

  // Woorking on tbl_product
  serInsProduct(pdata:any){
    return this.http.post(`${this.settings.server_path}/productpath/insertproduct`,pdata);
  }

  ser_product_data:any
  serGetProductdata(){
    return this.http.get(`${this.settings.server_path}/productpath/getproductdata`).pipe(map(dt=>{
      this.ser_product_data=dt;
      return dt;
    }))
  }

  ser_order_data:any
  serGetOderProductData(){
    return this.http.get(`${this.settings.server_path}/orderpath/getorderdata`).pipe(map((dt:any)=>{
      this.ser_order_data=dt.data;
      return dt;
    }))
  }

  updateOrderStatus(obj:any){
    console.log(obj)
    return this.http.put(`${this.settings.server_path}/orderpath/updateorderstatus`,obj).pipe(map((dt:any)=>{
      return dt.data;
    }))
  }
}
