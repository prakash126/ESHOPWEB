import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
declare var $:any;
@Component({
  selector: 'app-slider2',
  templateUrl: './slider2.component.html',
  styleUrls: ['./slider2.component.css']
})
export class Slider2Component implements OnInit {

  silder2data:any;
  constructor(public ser:UserService) { 
    this.ser.ser_silider2_data().subscribe((dt:any)=>{
     // alert(dt)
      this.silder2data=dt;
    })
  }

  funslider2left() {
    var cont = <HTMLDivElement>document.getElementById('divinner');
    $(cont).animate({ left: '-150px' }, 1000);
  }
  funslider2right() {
    var cont = <HTMLDivElement>document.getElementById('divinner');
    $(cont).animate({ left: '0px' }, 1000);
  }
  ngOnInit(): void {
  }

}
