import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../emitter.service';
import {UserService} from "../user.service"

@Component({
  selector: 'app-usercommon',
  templateUrl: './usercommon.component.html',
  styleUrls: ['./usercommon.component.css']
})
export class UsercommonComponent implements OnInit {

  constructor(private ser:UserService,private msgemitter:EmitterService) { 
    this.msgemitter.mymessageevent.subscribe(dt=>{
      
      this.log_messages=(dt.message);
      setTimeout(()=>{
        this.log_messages="";
      },10000)
    })
   }
  
   log_messages:any=""

  ngOnInit(): void {
  }

}
