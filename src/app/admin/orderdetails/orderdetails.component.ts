import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit,AfterViewInit {
  statusOptions: string[]=[
  'Recieved',
  'ready for dispatch',
  'Dispatched',
  'Out of delivery',
  'Delivered',
];
  statusOption:any;
  public temp:any;
  public orderDataArr:any;
  constructor(private adminser:AdminService,private msgemit:EmitterService) {
    this.funGetOrderData();
   }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  funGetOrderData(){
    if(this.adminser.ser_order_data){
      this.orderDataArr = this.adminser.ser_order_data
    }else{
      this.adminser.serGetOderProductData().subscribe((dt:any)=>{
        this.orderDataArr = dt.data;
        console.log(this.orderDataArr)
      })
    }
  }
  funEditOrderStatus(data:any){
    this.temp = data.id;


  }
  funSave(){
    //alert("hi")
    var obj = {
      orderid:this.temp,
      orderStatus:this.statusOption
    }
    // alert(obj.orderid);
    // alert(obj.orderStatus)
    this.adminser.updateOrderStatus(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result});
      this.temp=0;
      this.adminser.ser_order_data=null;
     
      this.funGetOrderData();
    })
  }



}
