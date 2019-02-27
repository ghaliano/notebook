import {Component, OnInit} from '@angular/core';
import {Contact} from "../model/contact.model";
import {HttpClient} from "@angular/common/http";
import {ContactService} from "../services/contact.service";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contacts: Array<Contact> = [];

    constructor(private contactService: ContactService) {
        this
            .contactService
            .fetchContacts()
            .subscribe((result: any) => {
                alert(1);
                console.log(result);
                this.contacts = result['hydra:member'];
            })
        ;
    }

    ngOnInit() {

    }
}
