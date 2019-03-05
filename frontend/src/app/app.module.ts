import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ContactService} from "./services/contact.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NumeroComponent } from './numero/numero.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { NumberComponent } from './number/number.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        SpinnerComponent,
        NumeroComponent,
        ContactAddComponent,
        ContactEditComponent,
        NumberComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    providers: [ContactService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
