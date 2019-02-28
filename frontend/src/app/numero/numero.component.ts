import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-numero',
    templateUrl: './numero.component.html',
    styleUrls: ['./numero.component.css']
})
export class NumeroComponent implements OnInit {
    id: number;
    num: string = '';

    constructor(private contactService: ContactService,
                private router: Router,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        console.log(this.id);
    }

    addNumber() {
        this.contactService
            .addNumber(this.id, this.num)
            .subscribe((result: any) => {
                this.router.navigate(['/']);
            });
    }

}
