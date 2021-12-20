import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
declare var $:any;
@Component({
  selector: 'app-slider1',
  templateUrl: './slider1.component.html',
  styleUrls: ['./slider1.component.css']
})
export class Slider1Component implements OnInit {

  silder1data:any;
  constructor(public ser:UserService) { 
    this.ser.ser_silider1_data().subscribe((dt:any)=>{
      //console.log(dt)
      this.silder1data=dt;
    })
  }

  funsliderleft() {
    var cont = <HTMLDivElement>document.getElementById('divInner');
    $(cont).animate({ left: '-150px' }, 1000);
  }
  funsliderright() {
    var cont = <HTMLDivElement>document.getElementById('divInner');
    $(cont).animate({ left: '0px' }, 1000);
  }
  ngOnInit(): void {
  }

}
