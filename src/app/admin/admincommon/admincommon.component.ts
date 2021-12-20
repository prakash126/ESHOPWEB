import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../emitter.service';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admincommon',
  templateUrl: './admincommon.component.html',
  styleUrls: ['./admincommon.component.css']
})
export class AdmincommonComponent implements OnInit {
  
  constructor(private msgemitter:EmitterService,public ser:AdminService,private router:Router) {
    this.msgemitter.mymessageevent.subscribe(dt=>{
      this.log_messages=(dt.message);
      setTimeout(()=>{
        this.log_messages="";
      },3000)
    })
   }
  log_messages:any=""
  ngOnInit(): void {
  }

 
}
