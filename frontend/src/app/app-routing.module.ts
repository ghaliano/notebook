import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactComponent} from "rxjs";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  Routes: [
    {path:'list', component: contactCom
  ]
})
export class AppRoutingModule { }
