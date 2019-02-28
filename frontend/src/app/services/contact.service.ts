import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../model/contact.model";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {

    }

    fetchContacts(param: string = ""): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts';
        if (param) {
            url += '?name=' + param;
        }
        return this.http
            .get(url);
    }

    deleteContact(contact: Contact): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts/';
        return this.http.delete(url + contact.id);
    }
    private _getHeaders():HttpHeaders {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return header;
    }
    addNumber(id,num): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/numbers';


        let options = {
                headers: this._getHeaders()
            };
            return this.http.post
            (url, JSON.stringify({num:num, contact:id }),options);
    }
}
