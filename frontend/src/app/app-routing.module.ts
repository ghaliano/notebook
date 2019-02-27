import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {Routes} from '@angular/router';
import {ContactComponent} from "./contact/contact.component";

export const routes: Routes = [
  {path: '', component: ContactComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
