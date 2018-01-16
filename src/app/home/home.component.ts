import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {Http} from '@angular/http';



@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
public model: any = new Date();
public model1: any;
private currencies: any;
private currencies1: any;
public info: string;
public result: string;

//public myDate: any;

  formatter = (result: any) => result.Cur_Abbreviation.toUpperCase();

  search = (text$: Observable<string>) =>
    map.call(distinctUntilChanged.call(debounceTime.call(text$, 200)),
      term => term.length < 2 ? [] : this.currencies.filter(v => v.Cur_Abbreviation.toLowerCase().indexOf(term.toLowerCase()) > -1 &&
       (this.parseDPModel(this.model) >= v.Cur_DateStart.substring(0, 10)) && (this.parseDPModel(this.model) < v.Cur_DateEnd.substring(0, 10))).slice(0, 10));

  public parseDPModel = (dpModel)=>{
    let dd = dpModel.day;
    let mm = dpModel.month;
    if (mm < 10) {
      mm = '0'+ mm;
    }
    if (dd < 10) {
      dd = '0'+ dd;
    }
    return dpModel.year + '-' + mm + '-' + dd;
  };

  constructor(private http: Http) {
    let curDate = new Date();
    this.model = { "year": curDate.getFullYear(), "month": curDate.getMonth(), "day": curDate.getDate()};

    http.get('http://www.nbrb.by/API/ExRates/Currencies')
        .map((data) => data.json())
        .subscribe((data) => {
          this.currencies = data;
        });
  }

  public myDate = function() {
    this.myVal = Date.parse(this.parseDPModel(this.model));
    return this.myVal;
  }

  public getCurrencies(){
    this.http.get(`http://www.nbrb.by/API/ExRates/Rates/${(this.model1.Cur_ID)}?onDate=${this.parseDPModel(this.model)}`)
        .map((data) => data.json())
        .subscribe((data) => {
          this.currencies1 = data;
        });
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
