import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserService } from '../user.service';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  public account_activated:boolean=false;
  public email:any;
  public username:any;
  constructor(private ar:ActivatedRoute,private userser:UserService) { 
    this.ar.params.subscribe((dt)=>{
      this.email=dt.email
      alert(dt.email);
      this.userser.ser_active_acccount({email:dt.email}).subscribe((dt:any)=>{
        //alert("HHI")
        //alert(dt.result);
        this.account_activated=true;
        this.username=dt.result.username
      })
    })
  }

  ngOnInit(): void {
  }

}
