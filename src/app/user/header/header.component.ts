import { Component, OnInit } from '@angular/core';
import { UseremitterService } from 'src/app/useremitter.service';
//import  $  from "jquery";
import { UserService } from '../user.service';
import { CartItemsService } from '../cart-items.service';
import { Router } from '@angular/router';
import {fromEvent} from "rxjs";
import { EmitterService } from 'src/app/user/emitter.service';
import decode from "jwt-decode";
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  total_cart_items:any=0;flag1:boolean=false;checklogin:any;btnText:string="Get otp"
  
  constructor(private eventobj:UseremitterService,private userser:UserService,private cartItem:CartItemsService,private rt:Router,private msgemit:EmitterService) {
      
    fromEvent(document,"click").subscribe((dt)=>{
      this.searchtemp=false;
    })

    this.checklogin=localStorage.getItem("aut");
    if(this.checklogin=="1"){
      let lclData:any = localStorage.getItem("tok")
      var tkdata:any = decode(lclData)
      this.loginuser=1;
       this.flag=1;
       this.loginusername=tkdata.username;
       
    }
    this.getTotalCartNo();
    // header me cart details count
    // if(localStorage.getItem('aut')){
    //   this.getTotalCartNo();
    // }
    // else{
    //   this.cartItem.currentmessage.subscribe((dt:any)=>{
    //     if(dt==0){
    //       this.flag1=true;
    //     }else{
    //       this.flag1=false;
    //       this.total_cart_items=dt;
    //     }
        
    //   })
    // }

      eventobj.myevent.subscribe((dt)=>{
        $("#modellogin").show('modal');
        
      })

      
   }

   getTotalCartNo(){
     if(localStorage.getItem('aut')){
       this.userser.ser_getcart_data().subscribe((dt:any)=>{
         if(dt==0){
           this.flag1=true;
         }else{
           this.flag1=false;
           this.total_cart_items=dt.length;
         }
         //this.total_cart_items = dt.length;
       })
      }else{
        this.cartItem.currentmessage.subscribe((dt:any)=>{
          if(dt==0){
            this.flag1=true;
          }else{
            this.flag1=false;
            this.total_cart_items=dt;
          }
          
        })
      }
     }

   funcloselogin(closeing:any){
    $('#' + closeing).hide('modal');
  }
  
  funOpenReg(){
    $("#modelreg").show('modal');
  }
  funclosereg(closeingreg:any,closelogin:any){
    $('#' + closeingreg).hide('modal');
    $('#' + closelogin).hide('modal');
  }

  funopenlogin(){
    //alert("hi")
    $("#modelreg").hide('modal');
    $('#modellogin').show('modal');
  }  
  ngOnInit(): void {
  }
 
  
  
  // registration releted
  txtemail:any;txtusername:any;txtpassword:any;txtmobile:any;txtaddress:any;txtpincode:any;txtstate:any;
  funInsReg(){
    var obj = {
      email:this.txtemail,
      username:this.txtusername,
      password:this.txtpassword,
      mobile:this.txtmobile,
      Address:this.txtaddress,
      pincode:this.txtpincode,
      state:this.txtstate
      
    }
    //alert(obj.email);
    this.userser.ser_ins_regdata(obj).subscribe((dt:any)=>{
      this.msgemit.mymessageevent.emit({message:dt.result});
      this.txtemail = '';
      this.txtusername = '';
      this.txtpassword = '';
      this.txtmobile = '';
      this.txtaddress = '';
      this.txtpincode = '';
      this.txtstate = '';
    })
     $("#modelreg").hide('modal');
    $('#modellogin').show('modal');
  }


  // login releted
  temail:any;txtpwd:any;userid:any;
  loginuser:any;
  loginusername:any;
  flag:any=0;
  funlogin(){
    //alert("hi")
    var obj = {email:this.temail,password:this.txtpwd}
   // alert(obj.email);
    this.userser.ser_get_regdata(obj).subscribe((dt:any)=>{
      this.temail = '';
      this.txtpwd = '';
     if(dt.result==0){
      // alert("Login Failed! Invalid email and password")
      this.msgemit.mymessageevent.emit({message:dt.message})
       this.flag=0;
        
        $('#modellogin').hide('modal');
     }
     else{
       if(dt.result==1){
        //  alert("Login Failed! Activate your account before login");
        this.msgemit.mymessageevent.emit({message:dt.message})
         $('#modellogin').hide('modal');
       }
       if(dt.result==2){
        this.msgemit.mymessageevent.emit({message:dt.message})
         
         var tokendata:any = decode(dt.token);
         this.loginusername=tokendata.username;
         this.flag=1;
         this.loginuser=1;
         $('#modellogin').hide('modal');
          this.userid=tokendata.userid;
            //alert(this.userid); 
            // this.emptycart();
            localStorage.setItem("aut","1");
            localStorage.setItem("tok",dt.token);
           
            this.funstorelocaldata();
            this.getTotalCartNo()
       }
     }
    })
  }

// if cart is empty
// emptycart(){
//   if(JSON.parse(localStorage.getItem('product')).length==0){
//     this.rt.navigateByUrl("/cart");
//   }
// }




  productid:any=[];quantity:any;localsdata:any;
  // funtion to get and send localstorage product data userservice 
  funstorelocaldata(){
    //alert("funstore from header");
    if(localStorage.getItem('product')){
      let lclData:any = localStorage.getItem("product");
      this.localsdata = JSON.parse(lclData);
    
   
    for(var i=0;i<this.localsdata.length;i++){
     
      var obj={
        "userid":this.userid,
        "prodid":this.localsdata[i]._id,
        "pname":this.localsdata[i].pname,
        "catid":this.localsdata[i].catid,
        "subcatid":this.localsdata[i].subcatid,
        "subsubcatid":this.localsdata[i].subsubcatid,
        "brandid":this.localsdata[i].brandid,
        "pcolor":this.localsdata[i].pcolor,
        "oldprice":this.localsdata[i].oldprice,
        "newprice":this.localsdata[i].newprice,
        "quantity":this.localsdata[i].quantity,
        //"description":this.localsdata[i].description,
        "rating":this.localsdata[i].rating,
        "offer":this.localsdata[i].offer,
        "size":this.localsdata[i].size,
        "ptype":this.localsdata[i].ptype,
        "pimage":this.localsdata[i].pimage,
       
        //prodbrand:this.localsdata[i].brand,
        "uqty":this.localsdata[i].uqty
      }
      //alert(obj)
      this.userser.ser_sendCartdata(obj).subscribe((dt:any)=>{
        // alert("uploaded")
        //alert(dt.result);
        if(dt.result == 'inserted'){
          this.rt.navigateByUrl('us/cart')
        }
        localStorage.removeItem('product');
       // this.emptycart();
      // this.rt.navigate['cart'];
      })
    }
    }
       
       //alert(obj.userid)
      // localStorage.removeItem('product');
     // this.emptycart(); 
      
  }


  // function for search box
  txtsearch!:string;searchdata: any;searchtemp:boolean=false;
  funsearch(){
    //alert(this.txtsearch)
    if(this.txtsearch.length>0){
      this.searchtemp=true;
      
    }
    else{
      this.searchtemp=false
    }
    this.userser.ser_searchbar_data({txt:this.txtsearch}).subscribe((dt:any)=>{
      this.searchdata=dt;
      //alert(this.searchdata)
      
    })
  }
  fun_search_click(obj:any) {
    //us/prodinfo;productid
    this.rt.navigate(['us/productinfo', { productid: obj._id }]);
    this.searchtemp = false;
  }
  

  // for header button
  flogin(){
    if(localStorage.getItem('auth')){
      alert("login Success.....")
    }
    else{
    this.eventobj.myevent.emit();
    }
  }
  flogout(){
   localStorage.removeItem('aut');
   localStorage.removeItem('tok');
   localStorage.removeItem('product')
   this.flag=0;
   this.loginusername="";
   this.total_cart_items = 0
   this.getTotalCartNo()
   this.rt.navigateByUrl("/us")
   
  }

  public showFiled:boolean =true;
  public showEmailField:boolean = false;
  forgetPwd(){
    //alert("hi forgetPwd")
    this.showFiled = false;
    this.showEmailField = true;
    this.showUpPwdBtn = true;
    
  }
  public otpDt!:any;
  public userId!:any;
  public showOtpFiled:boolean = false;
  public showUpPwdField:boolean = false;
  public showUpPwdBtn:boolean = false;
  public showPwdMatchBtn:boolean = false;
  getOtp(){
    this.showEmailField = false;
    this.showOtpFiled = true;
    this.showUpPwdField = true;
    this.showUpPwdBtn = true;
    this.showUpPwdBtn = false;
    this.showPwdMatchBtn = true;
    if(!this.temail){
      alert("Email missing");
      return ;
    }
    
    this.userser.ser_forgetpassword({email:this.temail}).subscribe((res:any)=>{
      this.temail = '';
      if(res.err){
        alert(res.msg);
        console.log(res);
      }else{
        //alert(res.result);
        console.log(res)
        this.userId = res.data._id
        this.otpDt = res.data.otp
      }
    })
  }
  public txtotp!:any;
  matchOtpAndUpdatePasssword(){
    //alert("hi")
    if(!(this.txtotp && this.txtpwd)){
      alert('Enter otp or password');
      return;
    }
    alert(this.txtotp + "----"+ this.otpDt )
    if(this.otpDt != this.txtotp){
      alert("Otp not matched");
      return ;
    }
    let obj = {
      id:this.userId,
      otp:this.txtotp,
      updatepwd:this.txtpwd
    }
    this.userser.ser_updatepassword(obj).subscribe((res:any)=>{
      console.log(res);
      alert("password changed");
      window.location.reload();
    })
  }
}
