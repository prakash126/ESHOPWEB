import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from "@angular/router"
import {ActivatedRouteSnapshot} from "@angular/router"
import decode from "jwt-decode"
import { EmitterService } from './emitter.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate{

  canActivate(ac:ActivatedRouteSnapshot){
    if(localStorage.getItem("tok"))
    {
      var tok_data:any=localStorage.getItem("tok")
      var decodedata:any=decode(tok_data)
      if(decodedata.aut==1)
      {
        return true;
        // if(ac.data.role)
        // {
        //   if(ac.data.role==decodedata.role)
        //   return true;
        //   else
        //   {
        //     this.msgemit.mymessageevent.emit({message:"No permission"})
        //     return false
        //   }
        // }
        // else
        // {
        //   return true;
      
        // }
       }
      else
      {
        alert("Oops! Login First")
        this.msgemit.mymessageevent.emit({message:"No permission"})
        return false;
      }
    }
    else
      {
        alert("Oops! Login First")

       // this.rt.navigateByUrl("/us")
  
      return false;
  
      }
  }
    constructor(private rt:Router,private msgemit:EmitterService) { }
}
