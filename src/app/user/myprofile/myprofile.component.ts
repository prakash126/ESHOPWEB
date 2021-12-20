import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import decode from 'jwt-decode';
import { EmitterService } from 'src/app/admin/emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

    data:any;
    userid:any;username:any;email:any;mobile:any;Address:any;pincode:any;state:any
  constructor(private userser:UserService,private msgemit:EmitterService,private rt:Router) { 
    let lclData:any =localStorage.getItem('tok');
    var tokdata:any = decode(lclData);
    var userid = tokdata.userid
    this.userser.ser_get_profiledata({userid:userid}).subscribe((dt:any)=>{
      //alert(dt)
      
      this.userid = dt[0]._id;
      this.username=dt[0].username,
      this.email=dt[0].email,
      this.mobile=dt[0].mobile,
      this.pincode=dt[0].pincode,
      this.state=dt[0].state,
      this.Address=dt[0].Address
    })
  }

  ngOnInit(): void {
  }
  
  funEditProfile(){
    let obj={
      userid:this.userid,
      username:this.username,
      email:this.email,
      mobile:this.mobile,
      pincode:this.pincode,
      state:this.state,
      Address:this.Address,
    }
    this.userser.ser_updateProfile(obj).subscribe((data:any)=>{
      //alert(data.msg)
      this.msgemit.mymessageevent.emit({message:data.msg});
      this.rt.navigateByUrl('/us')
    })
  }
}
