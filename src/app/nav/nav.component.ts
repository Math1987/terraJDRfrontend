import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {View} from '../services/world/view/view';


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
    if ( Account.user === null ){
      this.router.navigate(['/login']);
    }else{

      View.init();

      Worlds.init(function(worlds) {});
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
