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
                opacity: 1,
            })),
            state('closed', style({
                height: '0px',
                opacity: 0,
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
    isContactLoading: boolean = false;
    contacts: Array<Contact> = [];
    numbers: Array<number> = [];
    term:string = "";

    constructor(private contactService: ContactService) {
        this.search();
    }

    search(){
        this.isContactLoading = true;
        this
            .contactService
            .fetchContacts(this.term)
            .subscribe((result: any) => {
                this.contacts = result['hydra:member'];
                this.isContactLoading = false;
            })
        ;
    }
    deleteContact(contact){
        this.contactService
            .deleteContact(contact)
            .subscribe((result:any)=>{this.search();});
    }


    ngOnInit() {

    }

    toggleDetail(contact:any){
        contact.selected = !contact.selected;
    }


    toggle() {
        this.isOpen = !this.isOpen;
    }
}
