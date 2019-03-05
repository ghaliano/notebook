import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../services/contact.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-contact-add',
    templateUrl: './contact-add.component.html',
    styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
    form: FormGroup;
    spinneris:boolean=false;

    constructor(private fb: FormBuilder,
                private contactService: ContactService,
                private router: Router) {
        this.form = this.fb.group({
            name: ['Mariem', Validators.required],
            skype: ['', Validators.required],
            email: ['', Validators.email],
            adress: ['']
        });
    }

    ngOnInit() {

    }

    submit() {
        this.spinneris= true;
        console.log(this.form.valid);
        this
            .contactService
            .addContact(this.form.value)
            .subscribe(() => {
                this.router.navigate(['']);
            });
    }

}
