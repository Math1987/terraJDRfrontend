import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Net} from './services/net';
import {Account} from './services/account';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material';
import {Dialog} from './services/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {

    Net.init(this.http);
    Account.init();
    Dialog.init(this.dialog);
  }
}
