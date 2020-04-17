import { Component, OnInit } from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if ( !Account.isAdmin() ){
      this.router.navigate(['u/jeu']);
    }
  }

}
