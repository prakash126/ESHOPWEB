import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import decode from 'jwt-decode';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  odata:any;
  public counts:any;
  
  constructor(private userser:UserService) { 

    this.fungetoderdata();
    this.funOrderStatus();
  }

  ngOnInit(): void {
  }

  fungetoderdata(){
    let lclData:any = localStorage.getItem('tok')
    var data:any = decode(lclData);
    var userid = data.userid;
    this.userser.ser_getorderdata({userid:userid}).subscribe((dt:any)=>{
      //alert(dt);
      this.odata = dt.data;
    })
  }
  funOrderStatus(){
    this.counts = [
      'Recieved',
      'ready for dispatch',
      'Dispatched',
      'Out of delivery',
      'Delivered',
    ];
  }
  


}
