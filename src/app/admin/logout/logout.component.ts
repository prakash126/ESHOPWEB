import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private ser:AdminService,private router:Router) { 
    localStorage.removeItem("adminaut");
    this.ser.login_check=false;
    //this.logoutFun();
  }

  ngOnInit(): void {
  }
  // logoutFun(){
  //   alert('Hi')
  //   this.router.navigateByUrl('/login');
  // }
}
