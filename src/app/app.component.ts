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

    setTimeout(function() {
      if ( Net.socket.connected ){
        localStorage.removeItem("reload");
      }
      let intervalReload = setInterval(function() {
        console.log(localStorage.getItem("reload"));
        if ( !Net.socket.connected ){
          if ( !localStorage.getItem("reload") ){
            localStorage.setItem("reload", "done");
            window.location.reload();
          }else{
            localStorage.removeItem("reload");
            Account.deconnexion();
            Area.reset();
            Worlds.reset();
            self.router.navigate(['/login']);
            clearInterval(intervalReload);
          }
        }
      },1000);
    },1500);





  }
}
