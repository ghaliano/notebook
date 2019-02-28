import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ContactService} from "./services/contact.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import {FormsModule} from "@angular/forms";
import { NumeroComponent } from './numero/numero.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        SpinnerComponent,
        NumeroComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [ContactService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
