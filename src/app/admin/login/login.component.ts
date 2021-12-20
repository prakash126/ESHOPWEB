// import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../admin.service';
// import {Router} from "@angular/router"
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
// txtuname:string;txtpwd:string;
//   constructor(private ser:AdminService,private rt:Router) { }

//   ngOnInit(): void {
//   }
//   funlogin(){
//     var obj = {uname:this.txtuname,pwd:this.txtpwd}
//     //localStorage.setItem("adminaut","1");
//     this.ser.serAuth(obj).subscribe((dt:any)=>{
//       if(dt.login=="success"){
//         alert("Success")
//         localStorage.setItem("adminaut",dt.data);
//         this.rt.navigateByUrl("ad/cat")
//       }
//       else{
//         alert("Invalid username/passsword")
//       }
//     })
//   }
// }


import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {Router} from "@angular/router";
import decode from "jwt-decode";
import {ValidationForm} from '../../validation-form'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
txtuname:string="";txtpwd:string="";
validation_obj:ValidationForm = new ValidationForm()

  constructor(private ser:AdminService,private rt:Router) { 
    // restrict the user to not go to another by browser
    if(localStorage.getItem("adminaut")){
      var tok_data:any = localStorage.getItem("adminaut");
      var decodedata:any = decode(tok_data);
      if(decodedata.auth==1){
        this.ser.login_check=true;
        this.rt.navigateByUrl("ad/welcome");
      }
      else{
        // localstograge is there but auth is not there
      }
    }
    else{
      //No action
    }
  }


  ngOnInit(): void {
  }
  funlogin(){
    if(this.validation_obj.myform.valid){
    var obj={uname:this.validation_obj.myform.controls.uname.value,pwd:this.validation_obj.myform.controls.pwd.value}
    this.ser.serAuth(obj).subscribe(( dt:any)=>{
      if(dt.login=="success")
      {
        //alert("Success")
        this.ser.login_check=true;
        localStorage.setItem("adminaut",dt.data)
        var tok_data:any = localStorage.getItem("adminaut");
        var decodedata:any = decode(tok_data);
        if(decodedata.role=="admin"){
          this.rt.navigateByUrl("ad/cat")
        }
        else{
          this.rt.navigateByUrl("ad/welcome")
        }
        
      }
      else
      {
        alert("Invalid username/password")
      }
    })
  }
}
}
