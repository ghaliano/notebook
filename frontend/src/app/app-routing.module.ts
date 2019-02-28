import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {Routes} from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {NumeroComponent} from "./numero/numero.component";

export const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'contact/:id/add', component: NumeroComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
