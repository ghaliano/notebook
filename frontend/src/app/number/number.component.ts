import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Number} from "../model/contact.model";

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  numbers:Array<Number>=[];

  constructor(
      private http:HttpClient
  ) {
    this.http.get('http://127.0.0.1:8000/api/numbers')
        .subscribe((result)=>{
          console.log(result);
this.numbers=result["hydra:member"];
        });
  }

  ngOnInit() {
  }
  fetchNumber(){

  }

}
