import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Settings} from "../app/settings"
import { Session } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
settings=new Settings()
  constructor(private http:HttpClient) { }
  serGetCategory(){
    //  alert("hi")
    return this.http.get(`${this.settings.server_path}/catpath/getCategory`)
    
    }


    //  subcategory  code starts
   serGetSubCat(){
     return this.http.get(`${this.settings.server_path}/subcatpath/getsubcat`)
  }


    // getting data from subsubcat
  serGetSubSubCat(){
    return this.http.get(`${this.settings.server_path}/subsubcatpath/getSubSubCategoryData`)
}
}
