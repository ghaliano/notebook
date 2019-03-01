import {Component, OnInit, HostListener} from '@angular/core';
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
    page: number = 1;
    totalResult: number = 0;
    constructor(private contactService: ContactService) {
        this.search();
    }

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        //visible height + pixel scrolled >= total height
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            console.log("End");
            this.page++;
            this.search();
        }
    }

    search(){
        if (
            (this.contacts.length < this.totalResult) ||
            (!this.totalResult && !this.contacts.length)
        ){
            this.isContactLoading = true;
            this
                .contactService
                .fetchContacts(this.term, this.page)
                .subscribe((result: any) => {
                    this.totalResult = result['hydra:totalItems'];
                    result['hydra:member'].forEach((contact) => {
                        this.contacts.push(contact);
                    })
                    this.isContactLoading = false;
                })
            ;

        }
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
