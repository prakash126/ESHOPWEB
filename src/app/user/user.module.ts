// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UsercommonComponent } from './usercommon/usercommon.component';
// import {Routes, RouterModule} from "@angular/router";
// import { HeaderComponent } from './header/header.component';
// import { MenuComponent } from './menu/menu.component';
// import { BannerComponent } from './banner/banner.component';
// import { BodyComponent } from './body/body.component';
// import { FooterComponent } from './footer/footer.component'
// import {MatIconModule} from "@angular/material/icon";
// import { ProductsComponent } from './products/products.component';
// import { ProductinfoComponent } from './productinfo/productinfo.component';
// import {MatButtonModule} from "@angular/material/button";
// import { CartComponent } from './cart/cart.component';
// var obj:Routes=[
// {path:"",component:UsercommonComponent,children:[
//   {path:"",component:BodyComponent},
//   {path:"product",component:ProductsComponent},
//   {path:"productinfo",component:ProductinfoComponent},
//   {path:"cart",component:CartComponent}
// ]},
// ]

// @NgModule({
//   declarations: [UsercommonComponent, HeaderComponent, MenuComponent, BannerComponent, BodyComponent, FooterComponent, ProductsComponent, ProductinfoComponent, CartComponent],
//   imports: [MatIconModule,MatButtonModule,
//     CommonModule,RouterModule.forChild(obj)
//   ]
// })
// export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercommonComponent } from './usercommon/usercommon.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BannerComponent } from './banner/banner.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductsComponent } from './products/products.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { Slider1Component } from './slider1/slider1.component';
import {MatSelectModule} from '@angular/material/select';
import { Slider2Component } from './slider2/slider2.component';
import { ActivateComponent } from './activate/activate.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyorderComponent } from './myorder/myorder.component';
import { UserGuardService } from './user-guard.service';

var obj:Routes=[
  {path:"",component:UsercommonComponent,children:[
    {path:"",component:BodyComponent},
    {path:"product",component:ProductsComponent},
    {path:"productinfo",component:ProductinfoComponent},
    {path:"cart",component:CartComponent},
    {path:"activate",component:ActivateComponent},
    {path:'payment',component:PaymentPageComponent,canActivate:[UserGuardService]},
    {path:'profile',component:MyprofileComponent,canActivate:[UserGuardService]},
    {path:'myorder',component:MyorderComponent,canActivate:[UserGuardService]}
    
  ]},
  ]

@NgModule({
  declarations: [
    UsercommonComponent,
    HeaderComponent,
    MenuComponent,
    BannerComponent,
    BodyComponent,
    FooterComponent,
    ProductsComponent,
    ProductinfoComponent,
    CartComponent,
    Slider1Component,
    
    Slider2Component,
    
    ActivateComponent,
    
    PaymentPageComponent,
    
    MyprofileComponent,
    MyorderComponent
    
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(obj),
  ],
})
export class UserModule {}
