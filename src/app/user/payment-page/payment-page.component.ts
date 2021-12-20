import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { UserService } from '../user.service';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  public name:string = 'Track your Order';
  public counts:any;
  public orderStatus = "";
  public orderData:any = [];
  public orderDataId!:any;
  paymentid:any;
  paymentstatus:any;
  pay_success:boolean=false;dlt:any=0;
  lclData:any;
  tokdata:any;
  constructor(private userser:UserService) {
   //alert('hi')
    this.lclData = localStorage.getItem('tok');
    this.tokdata = decode(this.lclData);
    this.userser.ser_getorderdata({userid:this.tokdata.userid}).subscribe((res:any)=>{
      //console.log(res.data);
      this.orderData = res.data;
      // this.orderStatus = res.data[0].orderStatus;
      // console.log(this.orderStatus)
    })
    var str = document.URL;
    // alert(str)
    var arr = str.split("?")
    var narr = arr[1].split("&");
    //alert(narr[0]);
    this.paymentid = narr[0].split("=")
    //alert(this.paymentid[1])
    this.paymentstatus = narr[1].split("=")
    if(this.paymentstatus[1]=="Credit"){
      this.pay_success = true;
      this.funsendprodcarttoordertable();
    }
    else{
      this.pay_success = false;
    }
   }

  ngOnInit(): void {
   
  }
  
    cartdata:any;
  funsendprodcarttoordertable(){
    //alert('hiiiiii')
    var obj;
    
   
   /// alert(tokdata.username);
   this.userser.ser_getcart_data().subscribe((dt:any)=>{
     this.cartdata = dt;
     //alert(this.cartdata)
      // for(var i = 0 ;i<this.cartdata.length;i++){
      //   //console.log(this.cartdata[i])
      //   obj = {
      //     "userid":this.tokdata.userid,
      //     "username":this.tokdata.username,
      //     "useremail":this.tokdata.email,
      //     "prodid":this.cartdata[i].prodid,
      //     "pname":this.cartdata[i].pname,
      //     "pcolor":this.cartdata[i].pcolor,
      //     "psize":this.cartdata[i].size,
      //     "price":this.cartdata[i].newprice,
      //     "orderdate":new Date()
          
     
      //  }
      //  //console.log(obj);
      //  this.dlt=0;
      //  this.userser.send_oderdata(obj).subscribe((dt:any)=>{
      //    //alert(dt.result)
      //    if(dt.result == "Data Inserted"){
      //      //alert("hi")
      //      this.dlt=1;
      //    }
      //  })
      // }

      obj = {
        userid:this.tokdata.userid,
        username:this.tokdata.username,
        useremail:this.tokdata.email,
        proddata:this.cartdata,
      }
      if(obj.proddata.length === 0){
        return;
      }
      this.dlt=0;
      this.userser.send_oderdata(obj).subscribe((dt:any)=>{
           //alert(dt.result)
           if(dt.result == "Data Inserted"){
             //alert("hi")
             this.dlt=1;
             this.userser.deleteprodcartdata().subscribe((dt:any)=>{
              //alert(dt.result);
            })
           }
         })

   });
  
  if(this.dlt==1){
    
  }

}

public showBar:boolean = false;
funOrderStatus(){
  
  //alert(this.tokdata.userid);
  this.counts = [
   'Recieved',
   'ready for dispatch',
   'Dispatched',
   'Out of delivery',
   'Delivered',
 ];
this.showBar = true;
  // this.userser.ser_getorderdata({userid:this.tokdata.userid}).subscribe((res:any)=>{
  //   console.log(res.data);
    
  //   this.orderStatus = res.data[0].orderStatus;
  //   this.showBar = true;
  //   //Demo purpose only, Data might come from Api calls/service
  //   // for(let dt of res.data){
  //   //   this.orderData.push(dt);
  //   //   this.orderStatus=dt.orderStatus
  //   // }
  //   //alert(this.orderStatus)
  //   //this.orderStatus= res.orderStatus;

  // })
}

public orderDataByID:any;
findOderById(){
  // alert(this.orderDataId)
  this.userser.ser_getOrderDataById(this.orderDataId).subscribe((res:any)=>{
    
    this.orderDataByID = res.data[0];
    console.log(this.orderDataByID);
    this.orderStatus = this.orderDataByID.orderStatus;
    this.funOrderStatus()
  })
}
}
