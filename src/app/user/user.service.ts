import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../settings"
@Injectable({
  providedIn: 'root'
})
export class UserService {
settings:any;
      constructor(private http:HttpClient) { 
        this.settings = new Settings();
      }
      ser_get_product_subsubid(obj:any){
      return this.http.post(`${this.settings.server_path}/productpath/getproduct_subsubid`,obj)
      }
      ser_get_productinfo_productid(obj:any){
      // alert(obj);
        return this.http.post(`${this.settings.server_path}/productpath/getproductinfo_productid`,obj)
      }

      ser_get_productbname_brandid(obj:any){
        //alert(obj);
        return this.http.post(`${this.settings.server_path}/productpath/getproductbname_bid`,obj)
      }

      ser_ins_regdata(obj:any){
      //alert(obj);
       return this.http.post(`${this.settings.server_path}/regpath/insertregdata`,obj)
      }
      ser_updateProfile(obj:any){
        return this.http.put(`${this.settings.server_path}/profilepath/updateprofile`,obj)
      }
      ser_forgetpassword(email:any){
        return this.http.put(`${this.settings.server_path}/regpath/forgetpassword`,email)
      }
      ser_updatepassword(obj:any){
        return this.http.put(`${this.settings.server_path}/regpath/updatepassword`,obj)
      }
      ser_get_regdata(obj:any){
        return this.http.post(`${this.settings.server_path}/regpath/getregdata`,obj);
      }

      ser_sendCartdata(obj:any){
       // alert(obj.userid)
        return this.http.post(`${this.settings.server_path}/cartpath/insertcartdata`,obj)
      }

      ser_silider1_data(){
        return this.http.get(`${this.settings.server_path}/productpath/getsilder1info`);
      }
      ser_silider2_data(){
        return this.http.get(`${this.settings.server_path}/productpath/getsilder2info`);
      }

      ser_getproduct_sliderminmax(obj:any){
        return this.http.post(`${this.settings.server_path}/productpath/getsilderminmax`,obj)
      }

      ser_searchbar_data(obj:any){
        return this.http.post(`${this.settings.server_path}/productpath/getsearch_data`,obj)
      }

      ser_active_acccount(obj:any){
        //alert(obj.email);
        return this.http.post(`${this.settings.server_path}/regpath/useractivation`,obj)
      }

      // ser_send_prodcart_data to table

      ser_send_prodcart_data(obj:any){
        return this.http.post(`${this.settings.server_path}/productpath/senprodcartdatatotable`,obj)
      }
      ser_getcart_data_byuserid(userid:any,prodid:any){
        return this.http.get(`${this.settings.server_path}/productpath/getcartdetailbyuserid/${userid}/${prodid}`);
      }
      ser_update_cart_qty(cartid:any,uqty:any){
        //alert(uqty)
        let obj = {
          cartid:cartid,
          uqty:uqty
        }
        console.log(obj)
        return this.http.put(`${this.settings.server_path}/productpath/updatecartqty`,obj);
      }
      ser_getcart_data(){
        return this.http.get(`${this.settings.server_path}/productpath/getcartdetails`);
      }

      ser_payment(obj:any){
        return this.http.post(`${this.settings.server_path}/paymentpath/getpaymentlink`,obj)
      }

      deleteprodcartdata(){
        return this.http.get(`${this.settings.server_path}/productpath/deletecartdetails`);
      }
      deletecartdata(id:any){
        alert(id)
        return this.http.delete(`${this.settings.server_path}/productpath/removeitemfromcart/${id}`);
      }
      send_oderdata(obj:any){
        alert(obj);
        return this.http.post(`${this.settings.server_path}/paymentpath/sendoderdata`,obj)
      }

      ser_get_profiledata(obj:any){
       //alert(obj)
        return this.http.post(`${this.settings.server_path}/profilepath/getmyprofiledata`,obj);
      }

      ser_getorderdata(userid:any){
        //alert(obj.userid);
        return this.http.get(`${this.settings.server_path}/paymentpath/ordersdata/${userid.userid}`);
      }
      ser_getOrderDataById(id:any){
        //alert(obj.userid);
        return this.http.get(`${this.settings.server_path}/paymentpath/getOrderDataById/${id}`);
      }
}

