import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmincommonComponent } from './admincommon/admincommon.component';
import {Routes, RouterModule} from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from  '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

// For pagination dispalying content as per user choice
import {NgxPaginationModule} from "ngx-pagination";

// Side Nav
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatIconModule } from '@angular/material/icon';

//Tool Bar

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { GuardService } from './guard.service';
import { LogoutComponent } from './logout/logout.component';
import { DailyordersComponent } from './dailyorders/dailyorders.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular"


import { BrandComponent } from './brand/brand.component';
import { ProductsComponent } from './products/products.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component'
 
var obj:Routes=[
  {path:'',component:AdmincommonComponent,children:[
    {path:"",component: LoginComponent},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent},
    {path:"daily",component:DailyordersComponent,data:{role:'admin'},canActivate:[GuardService]},
    {path:"orderdetails",component:OrderdetailsComponent,data:{role:'admin'},canActivate:[GuardService]},
    {path:"welcome",component:WelcomeComponent,canActivate:[GuardService]},
    {path:'cat',component: CategoryComponent,canActivate:[GuardService]},
    {path:'subcat',component: SubcategoryComponent,canActivate:[GuardService]},
    {path:'subsubcat',component:SubsubcategoryComponent,canActivate:[GuardService]},
    {path:'brand',component:BrandComponent,canActivate:[GuardService]},
    {path:'products',component:ProductsComponent,canActivate:[GuardService]}
  ]},
  
];


@NgModule({
  declarations: [AdmincommonComponent, CategoryComponent, SubcategoryComponent, SubsubcategoryComponent, LoginComponent, LogoutComponent, DailyordersComponent, WelcomeComponent, BrandComponent, ProductsComponent, OrderdetailsComponent],
  imports: [
    MatInputModule,MatSortModule,MatPaginatorModule,MatTableModule,MatButtonModule,FormsModule,MatSelectModule,CommonModule,NgxPaginationModule,MatSidenavModule,MatSliderModule,MatDialogModule,MatIconModule,MatToolbarModule,MatMenuModule,ReactiveFormsModule,AgGridModule.withComponents([]),RouterModule.forChild(obj)
  ]
})
export class AdminModule { }
