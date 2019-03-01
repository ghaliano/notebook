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

    fetchContacts(param: string = "", page: number = 1): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts';
        if (param) {
            url += '?name=' + param;
        }
        if (page) {
            url += '?page=' + page;
        }
        return this.http
            .get(url);
    }

    getById(id: number): Observable<any> {
        return this
            .http
            .get('http://127.0.0.1:8000/api/contacts/'+id)
        ;
    }

    deleteContact(contact: Contact): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts/';
        return this.http.delete(url + contact.id);
    }

    private _getHeaders(): HttpHeaders {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return header;
    }

    addNumber(id, num): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/numbers';


        let options = {
            headers: this._getHeaders()
        };
        return this.http.post
        (url, JSON.stringify({num: num, contact: id}), options);
    }

    addContact(data: any): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts';
        let options = {
            headers: this._getHeaders()
        };
        return this.http.post(url, JSON.stringify(data), options);
    }

    editContact(data: any, id: number): Observable<any> {
        let url: string = 'http://127.0.0.1:8000/api/contacts/'+id;
        let options = {
            headers: this._getHeaders()
        };

        return this.http.put(url, JSON.stringify(data), options);
    }
}
