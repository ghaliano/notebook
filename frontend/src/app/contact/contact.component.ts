import {Component, OnInit} from '@angular/core';
import {Contact} from "../model/contact.model";
import {HttpClient} from "@angular/common/http";
import {ContactService} from "../services/contact.service";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-contact',
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']


})
export class ContactComponent implements OnInit {
    isOpen = true;

    contacts: Array<Contact> = [];
    numbers: Array<number> = [];

    constructor(private contactService: ContactService) {
        this
            .contactService
            .fetchContacts()
            .subscribe((result: any) => {
                console.log(result);
                this.contacts = result['hydra:member'];
            })
        ;
    }

    ngOnInit() {

    }


    toggle() {
        this.isOpen = !this.isOpen;
    }
}
