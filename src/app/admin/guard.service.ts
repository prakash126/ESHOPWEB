// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import deacode from 'jwt-decode';
// import {ActivatedRouteSnapshot} from '@angular/router'
// import { EmitterService } from './emitter.service';


// @Injectable({
//   providedIn: 'root'
// })


// export class GuardService implements CanActivate{
  

//   canActivate(ac:ActivatedRouteSnapshot){
//     if(localStorage.getItem("adminaut")){
//       var tok_data = localStorage.getItem("adminaut")
//       var decodedata = deacode(tok_data);
//      // console.log(decodedata);
   

//      if(decodedata.auth == 1){
//       if(ac.data.role){
//        // alert("this link contains data");
//        if(ac.data.role == decodedata.role){
//         return true;
//        }
//        else{
//         this.msgemit.mymessageevent.emit({message:"No perission"})
//         return false;
//        }
//       }
//       else{
        
//         return true;
//        // this.rt.navigateByUrl("ad/cat");
//       }
//      }
//      else{
//        return false;
//      }
//     }
//      else{
//       this.rt.navigateByUrl("ad/login");
//        return false;

//      }
//     }
   
  

//   constructor(private rt:Router,private msgemit:EmitterService) { }
// }


import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from "@angular/router"
import {ActivatedRouteSnapshot} from "@angular/router"
import decode from "jwt-decode"
import { EmitterService } from './emitter.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
canActivate(ac:ActivatedRouteSnapshot){
  if(localStorage.getItem("adminaut"))
  {
    var tok_data:any=localStorage.getItem("adminaut")
    var decodedata:any=decode(tok_data)
    if(decodedata.auth==1)
    {
      if(ac.data.role)
      {
        if(ac.data.role==decodedata.role)
        return true;
        else
        {
          this.msgemit.mymessageevent.emit({message:"No permission"})
          return false
        }
      }
      else
      {
        return true;
    
      }
     }
    else
    {
      return false;
    }
  }
  else
    {
      this.rt.navigateByUrl("ad/login")

    return false;

    }
}
  constructor(private rt:Router,private msgemit:EmitterService) { }
}
