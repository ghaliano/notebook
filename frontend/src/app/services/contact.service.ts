import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact, Number} from "../model/contact.model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    url:string = environment.url;

    constructor(private http: HttpClient) {

    }

    fetchContacts(data: any): Observable<any> {
        return this.http
            .get(
                this.url+'contacts'+ this.jsonToQueryString(data)
            );
    }

    getById(id: number): Observable<any> {
        return this
            .http
            .get(this.url+'contacts/'+id)
        ;
    }

    deleteContact(contact: Contact): Observable<any> {
        let url: string = this.url+'contacts/';
        return this.http.delete(url + contact.id);
    }

    deleteNumber(number: Number){
        return this.http.delete(this.url+'numbers/'+number.id);
    }

    private _getHeaders(): HttpHeaders {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return header;
    }

    addNumber(id, num): Observable<any> {
        let url: string = this.url+'numbers';


        let options = {
            headers: this._getHeaders()
        };
        return this.http.post
        (url, JSON.stringify({num: num, contact: id}), options);
    }

    addContact(data: any): Observable<any> {
        console.log(data);
        let url: string = this.url+'contacts';
        let options = {
            headers: this._getHeaders()
        };
        return this.http.post(url, JSON.stringify(data), options);
    }

    editContact(data: any, id: number): Observable<any> {
        let url: string = this.url+'contacts/'+id;
        let options = {
            headers: this._getHeaders()
        };

        return this.http.put(url, JSON.stringify(data), options);
    }

    editNumber(number: Number){
        let url: string = this.url+'numbers/'+number.id;
        let options = {
            headers: this._getHeaders()
        };

        return this.http.put(url, JSON.stringify(number), options);

    }

    private  jsonToQueryString(json) {
        return '?' +
            Object.keys(json).map((key) => {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }
}
