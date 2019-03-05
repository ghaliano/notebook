import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {Routes} from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {NumeroComponent} from "./numero/numero.component";
import {ContactAddComponent} from "./contact-add/contact-add.component";
import {ContactEditComponent} from "./contact-edit/contact-edit.component";
import {NumberComponent} from "./number/number.component";

export const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'contact/:id/number/add', component: NumeroComponent},
  {path: 'contact/add', component: ContactAddComponent},
  {path: 'contact/:id/edit', component: ContactEditComponent},
  {path:'numbers',component:NumberComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
