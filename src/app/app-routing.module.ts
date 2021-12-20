import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'ad',pathMatch:"full"},
  {path:'ad',loadChildren:()=>import('./admin/admin.module').then(x=>x.AdminModule)},
  {path:'us',loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
