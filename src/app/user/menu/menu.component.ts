import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
//import * from "jquery"
import * as $ from 'jquery'
//declare let $: any;
//declare var $:JQueryStatic;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  var_category:any;var_subcat:any;var_subsubcat:any;
  constructor(private commonser:CommonService) {
    this.commonser.serGetCategory().subscribe(dt=>{
      this.var_category=dt
    })
    this.commonser.serGetSubCat().subscribe(dt=>{
      this.var_subcat=dt
    })
    this.commonser.serGetSubSubCat().subscribe(dt=>{
      this.var_subsubcat=dt;
      //alert(this.var_subsubcat);
    })


    $(document).ready(function() {
      $('.navbar-light .dmenu').hover(function () {
        //alert('hi')
              $(this).find('.sm-menu').first().stop(true, true).slideDown(150);
          }, function () {
              $(this).find('.sm-menu').first().stop(true, true).slideUp(105)
          });
      }); 
       
      $(document).ready(function() {
        $(".megamenu").on("click", function(e:any) {
          e.stopPropagation();
        });
      });

   }

  ngOnInit(): void {
  }
  

}


// 10offOFDCX
// 09272202525