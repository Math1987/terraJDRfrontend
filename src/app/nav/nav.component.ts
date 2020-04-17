import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log('nav init');
    if ( Account.user === null ){
      this.router.navigate(['/login']);
    }else{
      Worlds.init();
    }

  }


  isAdmin(){
    return Account.isAdmin();
  }
  getUserPseudo(){
    if ( Account.user !== null && 'pseudo' in Account.user ){
      return Account.user.pseudo ;
    }else{
      return '' ;
    }
  }
  deconnexion(){
    Account.deconnexion();
    this.router.navigate(['/login']);
  }

}
