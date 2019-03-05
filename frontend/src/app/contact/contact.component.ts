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
import {catchError, map, retry} from "rxjs/operators";
import {throwError} from "rxjs";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

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
    error: string = "";
    constructor(private contactService: ContactService) {
        this.search(true);
    }

    onScroll(event: any) {
        //visible height + pixel scrolled >= total height
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            console.log("End");
            this.loadMore();
        }
    }

    hasMore(){
        const has:boolean =
            (this.contacts.length < this.totalResult) ||
            (!this.totalResult && !this.contacts.length)
        ;


        return  has;
    }

    loadMore(){
        this.page++;
        this.search();
    }
    autoComplete(){
        this.page = 1;
        this.search(true);
    }
    search(init: boolean = false){
        if (
            this.hasMore()
        ){
            this.isContactLoading = true;
            this
                .contactService
                .fetchContacts({
                    page: this.page,
                    name: this.term
                })
                .pipe(
                    map((result) => {
                        this.totalResult = result['hydra:totalItems'];
                        return result['hydra:member'];
                    }),
                    catchError((error) => {
                        console.log(error);
                        this.error = "Server error";
                        this.isContactLoading = false;
                        return throwError(error);
                    })
                )
                // Requette est ecxcuté
                .subscribe((result: any) => {
                    if (init){
                        this.contacts = [];
                    }
                    console.log(init);
                    //
                    result.forEach((contact) => {
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
            .subscribe((result:any)=>{this.search(true);});
    }


    ngOnInit() {

    }

    toggleDetail(contact:any){
        contact.selected = !contact.selected;
    }


    toggle() {
        this.isOpen = !this.isOpen;
    }

    toggleEdit(number){
        number.isUnderEdit = !number.isUnderEdit;
    }

    deleteNumber(number, contact){
        if(confirm("Are you sure ?")){
            console.log("Delete Confimed");
            number.isUnderDelete = true;
            this
                .contactService
                .deleteNumber(number)
                .subscribe((result) => {
                const index = contact
                    .numbers
                    .findIndex((item) => {
                    return item.id == number.id;
                });

                contact.numbers.splice(index, 1);
            })
        } else {
            console.log("Delete refused");
        }
    }
    editNumber(number){
        console.log(number);
        this.contactService.editNumber(number).subscribe(() => {
            this.toggleEdit(number);
        })
    }


    drop(event: CdkDragDrop<string[]>, number, contact) {
        console.log("dropped !");
        const numberPosition = event
            .source
            ._dragRef
            ._pointerPositionAtLastDirectionChange;

        const trashPosition = document
            .getElementById('trash')
            .getBoundingClientRect();
        if (
            (
                numberPosition.x < trashPosition.right &&
                numberPosition.x > trashPosition.left
            ) && (
                numberPosition.y < trashPosition.bottom &&
                numberPosition.y > trashPosition.top
            )
        ) {
            console.log("Delete detected !");
            this.deleteNumber(number, contact);
        }
    }
}
