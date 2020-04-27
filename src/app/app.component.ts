import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Net} from './services/net';
import {Account} from './services/account';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material';
import {Dialog} from './services/dialog';
import {Area} from './services/world/area';
import {Worlds} from './services/worlds';
import {Router} from '@angular/router';
import {NavComponent} from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private dialog : MatDialog,
    private router : Router
  ){}

  ngOnInit(): void {

    Net.init(this.http);
    Account.init();
    Dialog.init(this.dialog);

    const self = this ;

    check();

    function check(){

      setTimeout(function() {

        if (!Net.socket.connected) {
          Net.reset();
          let checkStatus = false ;
          Worlds.init(function() {
            checkStatus = true ;
            check();
          });

          setTimeout(function() {
            if ( !checkStatus ){
              alert('erreur de connection');
              self.deconnection();
            }
          }, 2500);

        }else{
          check();
        }

      },100);


    }

  }


  deconnection(){

    Net.socket.disconnect();
    Account.deconnexion();
    Area.reset();
    Worlds.reset();
    this.router.navigate(['/login']);
  }
}
