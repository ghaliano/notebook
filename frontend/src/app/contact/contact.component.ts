import {Component, OnInit} from '@angular/core';
import {Contact} from "../model/contact.model";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    listContact: Array<Contact> = [
        {id: 1, name: 'Ahmed', email:'ahmed@gmail.com', adresse:'tunis', skype:'Ahmed', viber:'viber123'},
        {id: 2, name: 'frontend', email:'front@gmail.com', adresse:'ariana', skype:'dkdkdk', viber:'vkkkk123'}



    ]

    constructor() {
    }

    ngOnInit() {
    }


}
