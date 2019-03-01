import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../services/contact.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../model/contact.model";

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
    form: FormGroup;
    id: number;
    contact: Contact;
    isContactLoading: boolean = false;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private contactService: ContactService) {

        this.form = this.fb.group(
            {
                name: ['', Validators.required],
                skype: ['', Validators.required],
                email: ['', Validators.email],
                adress: ['']
            }
        );
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.isContactLoading = true;
        this.contactService.getById(this.id).subscribe((result) => {
            this.isContactLoading = false;
            this.contact = result;
            this.form.patchValue(this.contact);
        });
    }

    submit() {
        this.contactService.editContact(this.form.value, this.id).subscribe(() => {
            this.router.navigate(['']);
        });
    }

}
