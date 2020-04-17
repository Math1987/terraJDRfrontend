import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Net} from './services/net';
import {Account} from './services/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    Net.init(this.http);
    Account.init();
  }
}
